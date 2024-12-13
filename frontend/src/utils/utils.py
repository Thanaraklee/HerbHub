import re

def map_effects_to_categories(effects, mapping):
    data = {key: [] for key in mapping.keys()}
    for effect in effects:
        for key in mapping.keys():
            if effect in mapping[key]:
                data[key].append(effect)
    return data


def insert_space_between_caps(text):
    return re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', text)