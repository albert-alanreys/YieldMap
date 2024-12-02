import logging
import os

from src.controller.flask_app import FlaskApp
from src.model.data_fetcher import DataFetcher


class Delegator:
    def __init__(self, fetch_info: dict) -> None:
        self.fetch_info = fetch_info
        self.logger = logging.getLogger(__name__)

    def delegate(self) -> None:
        print('YieldMap started')

        data_fetcher = DataFetcher(self.fetch_info)
        data = data_fetcher.fetch_data()
        
        flask_app = FlaskApp(
            data=data,
            import_name=__name__,
            static_folder=os.path.abspath("src/view/static"),
            template_folder=os.path.abspath("src/view/templates")
        )
        flask_app.run()