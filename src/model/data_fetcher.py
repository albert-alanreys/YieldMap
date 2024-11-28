from concurrent.futures import ThreadPoolExecutor
import logging

from src.model.enums import SeriesId
from src.model.fred_client import FREDClient


class DataFetcher:
    def __init__(self, fetch_info: dict) -> None:
        self.start_time = fetch_info['start_time']
        self.end_time = fetch_info['end_time']

        self.logger = logging.getLogger(__name__)
        self.fred_client = FREDClient()

    def fetch_data(self) -> dict:
        try:
            results = {}

            with ThreadPoolExecutor(max_workers=3) as executor:
                data = executor.map(
                    lambda series_id:
                        self.fred_client.get_series(
                            series_id=series_id.value,
                            start_time=self.start_time,
                            end_time=self.end_time
                        ),
                    SeriesId
                )

            for series_id, observations in zip(SeriesId, data):
                results[series_id.value] = observations

            return results
        except Exception as e:
            self.logger.error(f'Error: {e}')
            return {}