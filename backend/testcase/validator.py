
class RecordValidationFailure(Exception):
    pass

class RecordValidator:
    def __init__(self, record, structure):
        self.__record = record
        self.__structure = structure

        self.__exception = RecordValidationFailure
        self.__validator_mapping = {
            'string': self.__validate_string,
            'number': self.__validate_number,
            'array': self.__validate_array,
        }

    def validate(self):
        self.__validate_required_properties()
        for prop_key, prop_value in self.__record.items():
            property_schema = self.__structure['properties'].get(prop_key, None)
            if property_schema is None:
                raise self.__exception(f'Unknown {prop_key} structure property')
            
            validator_func = self.__validator_mapping.get(property_schema['type'], None)
            if validator_func is None:
                raise self.__exception(f'Unknown {property_schema["type"]} property type')

            validator_func(prop_key, prop_value, property_schema)

    def __validate_property_type(self, property_tag, property_value, obj_type):
        property_type = type(property_value)
        if property_type is not obj_type:
            raise self.__exception(
                f'Invalid {property_tag} property type - got {property_type.__name__}, expected {obj_type.__name__}'
            )

    def __validate_array(self, property_tag, property_value, property_schema):
        self.__validate_property_type(property_tag, property_value, str)

        if 'default' in property_schema and property_value not in property_schema['default']:
            raise self.__exception(
                f'Incorrect property value - got {property_value}, expected {(", ").join(property_schema["default"])}'
            )

    def __validate_number(self, property_tag, property_value, property_schema):
        self.__validate_property_type(property_tag, property_value, int)
        if 'minimum' in property_schema and property_value < property_schema['minimum']:
            raise self.__exception(
                f'Incorrect property value - got {property_value}, necessary minimum is {property_schema["minimum"]}'
            )

    def __validate_string(self, property_tag, property_value, *args):
        self.__validate_property_type(property_tag, property_value, str)

    def __validate_required_properties(self):
        for required_property in self.__structure['required']:
            if required_property not in self.__record:
                raise self.__exception(f'Missing required {required_property} property')


class StructureValidationFailure(Exception):
    pass

class StructureValidator:
    def __init__(self, structure):
        self.__structure = structure
        self.__exception = StructureValidationFailure

        self.__neccessary_fields = [
            "title",
            "type",
            "properties",
            "required"
        ]

    def validate(self):
        self.__validate_neccessary_fields()
        self.__validate_required_properties()

    def __validate_required_properties(self):
        for required_property in self.__structure['required']:
            if required_property not in self.__structure['properties']:
                raise self.__exception(f'There is {required_property} in "required" but not in properties themselves')

    def __validate_neccessary_fields(self):
        structure_fields = self.__structure.keys()
        for field in self.__neccessary_fields:
            if field not in structure_fields:
                raise self.__exception(f'Missing neccessary {field} field')
