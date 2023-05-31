from flask import Flask, request

app = Flask(__name__)

@app.route('/post', methods=['POST'])
def handle_post():
    data = request.get_json()
    actual_data = data["data"]

    response_data = {'message': 'fake' if actual_data == 'Chrome' else 'not'}
    return response_data, 200

if __name__ == '__main__':
    # process data
    app.run()
