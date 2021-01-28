from selenium import webdriver

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
    prods = []
    driver.get("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood")
    prod_list = driver.find_elements_by_css_selector("ul.prod_list > li")
    for prod in prod_list:
        product = extract_gs_prod(prod)
        prods.append(product)
    return prods

print(get_gs())
