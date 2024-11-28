import requests
import logging


class RequestHandler:
    logger = logging.getLogger(__name__)

    def get(self, url: str, parameters: dict = None) -> dict:
        try:
            response = requests.get(url, params=parameters)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            self.logger.error(f'HTTP error: {e}')
        except requests.exceptions.RequestException as e:
            self.logger.error(f'Request failed: {e}')