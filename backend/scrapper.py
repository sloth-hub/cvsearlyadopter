from selenium import webdriver
from selenium.webdriver.common.by import By
import time

options = webdriver.ChromeOptions()
options.add_argument("headless")    # 웹 브라우저를 띄우지 않는 headless chrome 옵션 적용
options.add_argument("disable-gpu")    # GPU 사용 안함
options.add_argument("lang=ko_KR")    # 언어 설정
driver = webdriver.Chrome("./chromedriver", options=options)  # 옵션적용


def extract_gs_prod(prod):
    prod_name = prod.find_element_by_css_selector("p.tit").text
    prod_price = prod.find_element_by_css_selector("p.price").text
    prod_price = prod_price.replace("원", "")
    prod_image = prod.find_element_by_css_selector("p.img > img").get_attribute("src")
    return {"name": prod_name, "price": prod_price, "image": prod_image}

def get_gs():
    gs_prods = []
    driver.get("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood")
    for i in range(3):
        time.sleep(1)
        prod_list = driver.find_elements_by_css_selector("ul.prod_list > li")
        for prod in prod_list:
            new = prod.find_elements_by_css_selector("p.flg04")
            if new:  # 신상품 표시가 있으면
                product = extract_gs_prod(prod)
                gs_prods.append(product)
        next_btn = driver.find_element_by_css_selector("div.paging > a.next")
        next_btn.click()
    driver.close()
    return gs_prods

print(get_gs())
