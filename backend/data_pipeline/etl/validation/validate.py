from jsonschema import validate, ValidationError
import logging

validate_schema = {
    "type": "object",
    "properties": {
        "species_name": {
            "type": "object",
            "properties": {
                "species_name": {
                    "type": "string",
                    "minLength": 1
                },
                "species_image": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "authorship": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "string"
                },
                "name_ref": {
                    "type": "string"
                },
                "link_ref": {
                    "type": "string"
                }
            },
            "required": ["species_name", "species_image", "authorship", "name_ref", "link_ref"]
        },
        "synonyms": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "minLength": 1
                    },
                    "author": {
                        "type": "string",
                        "minLength": 1
                    },
                    "protologue": {
                        "type": "string",
                        "minLength": 1
                    },
                    "wfo_link": {
                        "type": "string",
                        "minLength": 1
                    }
                },
                "required": ["name", "author", "protologue", "wfo_link"]
            }
        },
        "taxonomy": {
            "type": "object",
            "properties": {
                "kingdom": {
                    "type": "object",
                    "properties": {
                        "kingdom_name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "ref": {
                            "type": "string",
                            "minLength": 1
                        },
                    },
                    "required": ["kingdom_name", "ref"]
                },
                "subkingdom": {
                    "type": "object",
                    "properties": {
                        "subkingdom_name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "ref": {
                            "type": "string",
                            "minLength": 1
                        },
                    },
                    "required": ["subkingdom_name", "ref"]
                },
                "phylum": {
                    "type": "object",
                    "properties": {
                        "phylum_name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "ref": {
                            "type": "string",
                            "minLength": 1
                        },
                    },
                    "required": ["phylum_name", "ref"]
                },
                "family": {
                    "type": "object",
                    "properties": {
                        "family_name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "ref": {
                            "type": "string",
                            "minLength": 1
                        },
                    },
                    "required": ["family_name", "ref"]
                },
                "genus": {
                    "type": "object",
                    "properties": {
                        "genus_name": {
                            "type": "string",
                            "minLength": 1
                        },
                        "ref": {
                            "type": "string",
                            "minLength": 1
                        },
                    },
                    "required": ["genus_name", "ref"]
                },
            },
            "required": ["kingdom", "subkingdom", "phylum", "family", "genus"]
        },
        "part_and_medicinal": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "part": {
                        "type": "string",
                        "minLength": 1
                    },
                    "drug": {
                        "type": "string",
                        "minLength": 1
                    },
                    "medicinal_name": {
                        "type": "string",
                        "minLength": 1
                    },
                    "medicinal_source": {
                        "type": "string",
                        "minLength": 1
                    }
                },
                "required": ["part", "drug", "medicinal_name", "medicinal_source"]
            }
        },
        "part_and_checimal": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "chemical_name": {
                        "type": "string",
                        "minLength": 1
                    },
                    "activity_count": {
                        "type": "number"
                    },
                    "plant_part": {
                        "type": "string",
                        "minLength": 1
                    },
                    "low_parts_per_million": {
                        "type": "number"
                    },
                    "high_parts_per_million": {
                        "type": "number"
                    },
                    "standard_deviation": {
                        "type": "number"
                    },
                    "ref": {
                        "type": "string"
                    }
                },
                "required": ["chemical_name", "activity_count", "plant_part", "low_parts_per_million", "high_parts_per_million", "standard_deviation", "ref"]
            }
        },
        "common_name_th": {
            "type": "object",
            "properties": {
                "common_name_th": {
                    "type": "string"
                },
                "common_name_th_ref": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": ["common_name_th", "common_name_th_ref"]
        },
        "common_name_en": {
            "type": "object",
            "properties": {
                "common_name_en": {
                    "type": "string"
                },
                "common_name_en_ref": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": ["common_name_en", "common_name_en_ref"]
        },
        "local_name": {
            "type": "object",
            "properties": {
                "local_name": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "local_name_ref": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": ["local_name", "local_name_ref"]
        },
        "clinical_studies": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "clinical": {
                        "type": "string",
                        "minLength": 1
                    },
                    "clinical_content": {
                        "type": "string",
                        "minLength": 1
                    },
                    "clinical_ref": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "required": ["clinical", "clinical_content","clinical_ref"]
            }
        },
        "pharmacological_studies": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "pharmacological": {
                        "type": "string",
                        "minLength": 1
                    },
                    "pharmacological_content": {
                        "type": "string",
                        "minLength": 1
                    },
                    "pharmacological_ref": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "required": ["pharmacological", "pharmacological_content", "pharmacological_ref"]
            }
        }
    },
    "required": [
        "species_name",
        "synonyms",
        "taxonomy",
        "part_and_medicinal",
        "part_and_checimal",
        "common_name_th",
        "common_name_en",
        "local_name",
        "clinical_studies",
        "pharmacological_studies"
    ]
}

class ValidateHerb:
    def __init__(self):
        self.validate_schema = validate_schema

    def validate(self, data: dict) -> bool:
        logging.info("Validating data...")
        try:
            validate(instance=data, schema=self.validate_schema)
            logging.info("Validation passed 🚀")
            return True
        except ValidationError as e:
            logging.error(f"Validation error in path {e.path}: {e.message}")
            return False
        except Exception as e:
            logging.error(f"Unexpected error during validation: {str(e)}")
            return False