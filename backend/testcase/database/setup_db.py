from database.db import Database

RECORDS_TABLE_SCHEMA = """CREATE TABLE records (
    id BIGSERIAL NOT NULL,
    structure_id int8 NOT NULL,
    data jsonb NOT NULL,
    created int4 NOT NULL,
    created_by int4 NOT NULL,
    updated int4 NOT NULL,
    updated_by int4 NOT NULL,
    PRIMARY KEY (id));
    COMMENT ON COLUMN records.data IS 'Запись в виде JSON. Тип в PGSQL - JSONB.';"""

STRUCTURES_TABLE_SCHEMA = """CREATE TABLE structures (
    id BIGSERIAL NOT NULL,
    data jsonb NOT NULL,
    created int4 NOT NULL,
    created_by int4 NOT NULL,
    updated int4 NOT NULL,
    updated_by int4 NOT NULL,
    PRIMARY KEY (id));
    COMMENT ON COLUMN structures.data IS 'Структура в виде JSON. Тип в PGSQL -
    JSONB.';
    ALTER TABLE records ADD CONSTRAINT FKrecords317037 FOREIGN KEY (structure_id)
    REFERENCES structures (id) ON DELETE CASCADE;
    """

JSONB_MERGE_FUNCTION = """create or replace function jsonb_merge(a jsonb, b jsonb)
returns jsonb language sql as $$
    select 
        jsonb_object_agg(
           ka,
           FORMAT('{"value": %s, "description": %s}', va, vb->'description')::jsonb
        )
    from jsonb_each(a) e1(ka, va)
    full join jsonb_each(b) e2(kb, vb) on ka = kb
$$;"""

def setup_db():
    db_inst = Database()
    db_inst.connect_to_db()

    #Creating RECORDS table
    db_inst.execute(RECORDS_TABLE_SCHEMA)

    #Creating STRUCTURES table
    db_inst.execute(STRUCTURES_TABLE_SCHEMA)

    #Creating JSONB merge function for records + structures description
    db_inst.execute(JSONB_MERGE_FUNCTION, close_cursor=True)

    db_inst.commit()
    db_inst.close_connection()

    return True
