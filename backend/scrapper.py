from selenium import webdriver
from selenium.webdriver.common.by import By
import time

options = webdriver.ChromeOptions()
# options.add_argument("headless")    # 웹 브라우저를 띄우지 않는 headless chrome 옵션 적용
options.add_argument("disable-gpu")    # GPU 사용 안함
options.add_argument("lang=ko_KR")    # 언어 설정
driver = webdriver.Chrome("./chromedriver", options=options)  # 옵션적용

driver.execute_script('window.open("about:blank", "_blank");') # 탭 두개 더 열기
driver.execute_script('window.open("about:blank", "_blank");') 

tabs = driver.window_handles

# TAB_1_GS25
driver.switch_to_window(tabs[0])
driver.get("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood")
 
# TAB_2_7-Eleven
driver.switch_to_window(tabs[1])
driver.get("https://7-eleven.co.kr/product/bestdosirakList.asp")
 
# TAB_3_CU
driver.switch_to_window(tabs[2])
driver.get("http://cu.bgfretail.com/product/product.do?category=product&depth2=4")


def extract_gs_prod(prod):
    prod_name = prod.find_element_by_css_selector("p.tit").text
    prod_price = prod.find_element_by_css_selector("p.price").text
    prod_price = prod_price.replace("원", "")
    prod_image = prod.find_element_by_css_selector("p.img > img").get_attribute("src")
    return {"name": prod_name, "price": prod_price, "image": prod_image}

def get_gs():
    gs_prods = []
    driver.switch_to_window(tabs[0])
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
    return gs_prods

def extract_se_prod(prod):
    prod_name = prod.find_element_by_css_selector("div.infowrap > div.name").text
    prod_price = prod.find_element_by_css_selector("div.infowrap > div.price > span").text
    prod_image = prod.find_element_by_css_selector("div.pic_product > img").get_attribute("src")
    return {"name": prod_name, "price": prod_price, "image": prod_image}

def get_se():
    se_prods = []
    driver.switch_to_window(tabs[1])
    for i in range(2):
        time.sleep(1)
        prod_list = driver.find_elements_by_css_selector("div.dosirak_list > ul > li")
        for prod in prod_list[1:-1]:
            new = prod.find_elements_by_css_selector("li.ico_tag_03")
            if new:  # 신상품 표시가 있으면
                product = extract_se_prod(prod)
                se_prods.append(product)
        next_btn = driver.find_element_by_css_selector("li.btn_more > a")
        next_btn.click()
    return se_prods

def extract_cu_prod(prod):
    prod_name = prod.find_element_by_css_selector("p.prodName > span").text
    prod_price = prod.find_element_by_css_selector("p.prodPrice > span").text
    prod_image = prod.find_element_by_css_selector("div.photo > a > img").get_attribute("src")
    return {"name": prod_name, "price": prod_price, "image": prod_image}

def get_cu():
    cu_prods = []
    driver.switch_to_window(tabs[2])
    time.sleep(3)
    # 최신순 버튼 클릭
    newest_btn = driver.find_element_by_css_selector("li#setC > span > a")
    newest_btn.click()
    for i in range(5):
        time.sleep(3)
        try: # 다음 페이지 버튼이 없는 경우 멈춤
            next_btn = driver.find_element_by_css_selector("div.prodListBtn-w > a")
            next_btn.click()
        except:
            break
    prod_wrap = driver.find_elements_by_css_selector("div.prodListWrap")
    for wrap in prod_wrap:
        prod_list = wrap.find_elements_by_css_selector("ul > li")
        for prod in prod_list:
            new = prod.find_elements_by_css_selector("span.tag > img[alt=New]")
            if new:  # 신상품 표시가 있으면
                product = extract_cu_prod(prod)
                cu_prods.append(product)
        
    return cu_prods

print(get_cu())
