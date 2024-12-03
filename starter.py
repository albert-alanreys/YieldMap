import logging

from config import fetch_info
from src.delegator import Delegator


def main() -> None:
    logging.basicConfig(level=logging.INFO)

    delegator = Delegator(fetch_info)
    delegator.delegate()


if __name__ == '__main__':
    main()