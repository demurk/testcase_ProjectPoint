from json import dumps, loads, JSONDecodeError
from time import time

from pyramid.view import view_config, view_defaults
from pyramid.response import Response

from database.db import Database
from validator import RecordValidationFailure, RecordValidator, StructureValidationFailure, StructureValidator

TEST_CREATE_USER_ID = 1
TEST_UPDATE_USER_ID = 2

DB_INST = Database()
DB_INST.connect_to_db(auto_commit=True)

@view_config(context=RecordValidationFailure)
def failed_record_validation(exc, request):
    return Response(
        f'Failed record validation: {exc.args[0]}',
        status=400
    )

@view_config(context=StructureValidationFailure)
def failed_structure_validation(exc, request):
    return Response(
        f'Failed structure validation: {exc.args[0]}',
        status=400
    )

@view_config(context=JSONDecodeError)
def bad_json_format(exc, request):
    return Response(
        f'Bad JSON format: {exc.args[0]}',
        status=400
    )

@view_defaults(route_name='structures')
class StructuresViews:
    def __init__(self, request):
        self.request = request
        self.table_name = 'structures'

    @staticmethod
    def validate_record(structure):
        validator = StructureValidator(structure)
        validator.validate()

    @view_config(request_method='GET')
    def structures_get(self):
        structures = DB_INST.execute(
            """select id, data->>'title' from {} order by data->>'title';""".format(self.table_name),
            fetchall=True,
            close_cursor=True
        )

        structures_json = [{
            'id': x[0],
            'title': x[1],
        } for x in structures]

        return Response(dumps(structures_json), status=200)

    @view_config(request_method='POST')
    def structures_post(self):
        self.validate_record(self.request.json)

        timestamp = time()
        DB_INST.execute(
            """insert into {} (data, created, created_by, updated, updated_by)
            values (%s,%s,%s,%s,%s);""".format(self.table_name),
            params=(self.request.json, timestamp, TEST_CREATE_USER_ID, timestamp, TEST_CREATE_USER_ID),
            close_cursor=True
        )

        return Response(dumps(self.request.json), status=201)

    @view_config(request_method='PUT')
    def structures_put(self):
        request_json = self.request.json

        self.validate_record(request_json['data'])
        DB_INST.execute(
            """update {} set data=%s, updated=%s, updated_by=%s where id=%s;""".format(self.table_name),
            params=(request_json['data'], time(), TEST_UPDATE_USER_ID, request_json['structureId']),
            close_cursor=True
        )

        return Response(dumps(self.request.json), status=201)

    @view_config(request_method='DELETE', renderer='json')
    def structures_delete(self):
        DB_INST.execute(
            """delete from {} where id=%s;""".format(self.table_name),
            params=(self.request.json['id']),
            close_cursor=True
        )

        return Response(dumps(self.request.json), status=200)

    @view_config(request_method='OPTIONS')
    def structures_options(self):
        return Response(dumps({}), status=200)


@view_config(route_name='structure')
def structure_get(request):
    structure = DB_INST.execute(
        """select data from structures
        WHERE id = %s;""",
        params=(request.matchdict['structure_id']),
        fetchone=True,
        close_cursor=True
    )[0]

    return Response(dumps(structure), status=200)

@view_defaults(route_name='records')
class RecordsViews:
    def __init__(self, request):
        self.request = request
        self.table_name = 'records'

    @staticmethod
    def validate_record(record, structure_id):
        structure_data = DB_INST.execute(
            """select data from structures where id=%s;""",
            params=(structure_id,),
            fetchone=True
        )[0]
        
        validator = RecordValidator(record, structure_data)
        validator.validate()

    @view_config(request_method="GET")
    def records_get(self):
        records = DB_INST.execute(
            """select * from (SELECT R.ID,
                R.STRUCTURE_ID,
                JSONB_MERGE(R.DATA, S.DATA -> 'properties') merged_data
            FROM {} R
            JOIN STRUCTURES S ON R.STRUCTURE_ID = S.ID
            WHERE R.STRUCTURE_ID = %s) sub
            ORDER BY merged_data -> 'brand' -> 'value',
            merged_data -> 'model' -> 'value',
            merged_data -> 'price' -> 'value';""".format(self.table_name),
            params=(self.request.matchdict['structure_id']),
            fetchall=True,
            close_cursor=True
        )

        records_json = [{
            'id': x[0],
            'structure_id': x[1],
            'data': x[2]
        } for x in records]

        return Response(dumps(records_json), status=200)

    @view_config(request_method='POST')
    def records_post(self):
        structure_id = self.request.matchdict['structure_id']
        self.validate_record(self.request.json, structure_id)

        DB_INST.execute(
            """insert into records (structure_id, data, created, created_by, updated, updated_by)
            values (%s,%s,%s,%s,%s,%s);""",
            params=(structure_id, self.request.json, time(), TEST_CREATE_USER_ID, time(), TEST_CREATE_USER_ID),
            close_cursor=True
        )

        return Response(dumps(self.request.json), status=201)

    @view_config(request_method='PUT')
    def records_put(self):
        request_json = self.request.json
        request_data = loads(request_json['data'])

        structure_id = self.request.matchdict['structure_id']
        self.validate_record(request_data, structure_id)

        DB_INST.execute(
            """update {} set data=%s, updated=%s, updated_by=%s where id=%s;""".format(self.table_name),
            params=(request_json['data'], time(), TEST_UPDATE_USER_ID, request_json['recordId']),
            close_cursor=True
        )

        return Response(dumps(request_json), status=201)

    @view_config(request_method='DELETE')
    def records_delete(self):
        request_json = self.request.json
        DB_INST.execute(
            """delete from {} where id=%s;""".format(self.table_name),
            params=(request_json['id']),
            close_cursor=True
        )

        return Response(dumps(request_json), status=200)

    @view_config(request_method='OPTIONS')
    def records_options(self):
        return Response(dumps({}), status=200)


@view_config(route_name='record')
def record_get(request):
    record = DB_INST.execute(
        """select data from records
        WHERE id = %s;""",
        params=(request.matchdict['record_id']),
        fetchone=True,
        close_cursor=True
    )[0]

    return Response(dumps(record), status=200)