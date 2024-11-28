import os

from src.model.request_handler import RequestHandler


class FREDClient(RequestHandler):
    def __init__(self) -> None:
        with open(os.path.abspath('.env'), 'r') as file:
            for line in file.readlines():
                if line.startswith(chars := f'FRED_API_KEY='):
                    self.api_key = (line.lstrip(chars).rstrip('\n'))

    def get_series(
        self,
        series_id: str,
        start_time: str,
        end_time: str
    ) -> dict:
        url = 'https://api.stlouisfed.org/fred/series/observations'
        params = {
            'api_key': self.api_key,
            'file_type': 'json',
            'series_id': series_id,
            'sort_order': 'desc',
            'observation_start': start_time,
            'observation_end': end_time,
        }
        return self.get(url, params)['observations']