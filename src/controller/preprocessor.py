import datetime
import json
import logging


class Preprocessor:
    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)

    def preprocess(self, raw_data: dict) -> str:
        try:
            processed_data = {}

            for series_id in raw_data:
                for observation in raw_data[series_id]:
                    if observation['value'] == '.':
                        continue

                    observation_date = datetime.datetime.strptime(
                        observation['date'], "%Y-%m-%d"
                    )

                    if observation_date.weekday() != 4:
                        continue

                    if observation['date'] not in processed_data:
                        processed_data[observation['date']] = {}

                    processed_data[observation['date']].update(
                        {series_id: float(observation['value'])}
                    )

            return json.dumps(processed_data)
        except Exception as e:
            self.logger.error(f'Error: {e}')
            return "{}"