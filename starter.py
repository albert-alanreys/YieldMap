import logging

from src.delegator import Delegator


fetch_info = {
    'start_time': '2005-01-01',
    'end_time': '2025-01-01',
}


def main() -> None:
    logging.basicConfig(level=logging.INFO)

    delegator = Delegator(fetch_info)
    delegator.delegate()


if __name__ == '__main__':
    main()