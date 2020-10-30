import requests
import bs4
stuff=list()


from flask import Flask, request, jsonify
from flask import send_from_directory

import uuid

# FUNCTION TO GET URL
def get_html_data(url):
    data = requests.get(url)
    return data

def get_corona_detail_of_india():
    url= "https://www.mohfw.gov.in/"
    html_data = get_html_data(url)

    bs = bs4.BeautifulSoup(html_data.text, 'html.parser') # MAKING OF OBJECT
    info_div1 = bs.find("li",class_="bg-blue").find_all('strong', class_="mob-hide")
    active_no=info_div1[1].get_text().split()[0]
    info_div2 = bs.find("li",class_="bg-green").find_all('strong', class_="mob-hide")
    dis_no=info_div2[1].get_text().split()[0]
    info_div3 = bs.find("li",class_="bg-red").find_all('strong', class_="mob-hide")
    death_no=info_div3[1].get_text().split()[0]
    mig="1"

    all_details = (active_no,dis_no,death_no)
    return all_details


app = Flask(__name__)

@app.route('/', methods=['GET'])
def send_index():
    return send_from_directory('./www', "index.html")

@app.route('/<path:path>', methods=['GET'])
def send_root(path):
    return send_from_directory('./www', path)

@app.route('/api/scrap', methods=['POST'])
def scrap():

    details=get_corona_detail_of_india()
    response = {"id":str(uuid.uuid4()),"active":details[0],"discharged":details[1],"deaths":details[2]}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)












