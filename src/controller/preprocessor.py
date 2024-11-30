import datetime
import json
import logging

from src.model.enums import SeriesId


class Preprocessor:
    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)

    def preprocess(self, raw_data: dict) -> str:
        try:
            processed_data = {}
            processed_months = set()

            for series_id in raw_data:
                for observation in raw_data[series_id]:
                    if observation['value'] == '.':
                        continue

                    date = datetime.datetime.strptime(
                        observation['date'], "%Y-%m-%d"
                    )
                    year_month = (series_id, date.year, date.month)

                    if year_month in processed_months:
                        continue

                    if observation['date'] not in processed_data:
                        processed_data[observation['date']] = []

                    processed_data[observation['date']].append(
                        {
                            'time': series_id,
                            'value': float(observation['value'])
                        }
                    )
                    processed_months.add(year_month)

            return json.dumps(processed_data)
        except Exception as e:
            self.logger.error(f'Error: {e}')
            return "{}"