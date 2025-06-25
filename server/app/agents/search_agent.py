# mock search agent
def search_providers(prompt: str):
    # parse location, specialty etc.
    return [
        {"id": "prov1", "name": "Dr. A", "phone": "+911234567890"},
        {"id": "prov2", "name": "Dr. B", "phone": "+919876543210"}
    ]