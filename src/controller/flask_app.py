from flask import Flask, render_template, Response

from src.controller.preprocessor import Preprocessor


class FlaskApp(Flask):
    def __init__(self, data: dict, **kwargs: str) -> None:
        preprocessor = Preprocessor()
        self.processed_data = preprocessor.preprocess(data)

        super().__init__(**kwargs)

        self.add_url_rule('/', 'index', self.index)
        self.add_url_rule('/data', 'get_data', self.get_data)
    
    def index(self) -> Response:
        return render_template('index.html')

    def get_data(self) -> Response:
        return self.processed_data