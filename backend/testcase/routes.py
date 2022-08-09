
def includeme(config):
    config.add_route('structures', '/app/structures')
    config.add_route('structure', '/app/structures/{structure_id}')
    config.add_route('records', '/app/structures/{structure_id}/records')
    config.add_route('record', '/app/structures/{structure_id}/records/{record_id}')