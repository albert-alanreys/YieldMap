from flask import Flask, render_template, Response

from src.controller.preprocessor import Preprocessor


class FlaskApp(Flask):
    def __init__(self, data: dict, **args: str) -> None:
        preprocessor = Preprocessor()
        self.response = preprocessor.preprocess(data)

        super().__init__(**args)
        self.route('/')(self.index)
        self.route('/get_data')(self.get_data)
    
    def index(self) -> Response:
        return render_template('index.html')

    def get_data(self) -> Response:
        return self.response