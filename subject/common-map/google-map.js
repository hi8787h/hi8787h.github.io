$(".owl-carousel.google-map-product-list-collapse").owlCarousel
  ({
    loop: false,
    margin: 20,
    stagePadding: 32,
    responsive:
    {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      810:
      {
        item: 3
      }
    }
  });


let mapmodal = document.querySelector('#map-modal')

let map = L.map('google-big-map',
  {
    center: [23.7625225, 121.0302279],
    zoom: 8,
    wheelPxPerZoomLevel: 80,
    tapTolerance: 10,
    keyboard: true
  })
  let site_location=
  {"id":
  ["B001","B002","B003"],
    "site":
      ["基隆嶼燈塔", "基隆城市博覽會 基隆之星海上展覽(國門廣場附近)", "桃園戶外休閒體驗營 | OBT 台灣外展 | 高空繩索  X   落羽松露營"]
    , 
    "location":
    {
      "lat": [25.156652, 25.1319577, 24.8418952]
      , "lng": [121.7313924, 121.7379821, 121.1881965]
    }
    ,"price":
    [210,100,700]
    , "mapimgsrc":
      ["https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_A12-00407_2.jpg", "https://wowlavie-aws.hmgcdn.com/file/article_all/A20220616134753880.jpg", "https://wowlavie-aws.hmgcdn.com/file/article_all/A20220616134753880.jpg"]
}


var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var osm = new L.TileLayer(osmUrl, { minZoom: 4, maxZoom: 18 })
map.addLayer(osm)

mapmodal.addEventListener('shown.bs.modal',
function () 
{
  map.invalidateSize();
})

 // const fade_data = "../fadedate.json"
  let cardTemplate = document.getElementById('MapcardTemplate');
  let map_product_list = document.querySelector(".google-map-product-list");
  let MapcardTemplate = document.getElementById("MapcardTemplate");
/*
  let xhr = new XMLHttpRequest();
        xhr.onload = () =>{
            //收到回應要做的事
            //console.log(xhr)
            if(xhr.readyState == 4 && xhr.status == 200){
                iPadArray = JSON.parse(xhr.response)
                afterResponse();
            }
            else{   console.log('抓資料失敗')}
        }
        xhr.open('GET',url)
        xhr.send(); //去network看請求、回應
*/

let saveArray = [];
function createCard(index)  //創造卡片
{
    let cloneContent = MapcardTemplate.content.cloneNode(true);
    cloneContent.querySelector('h5').innerText = site_location.site[index];
    cloneContent.querySelector('img').src = site_location.mapimgsrc[index];
    cloneContent.querySelector('.map-price').innerText = `TWD ${site_location.price[index]}`;

    map_product_list.append(cloneContent);
}

  function clearCard(index) 
  {
    let map_card = document.querySelectorAll(".google-map-product-item");
    map_card[index].remove();
  }
  map.on("moveend",function()
  {
    let map_northEast_lat = map.getBounds()._northEast.lat; //目前地圖右邊 緯度
    let map_northEast_lng = map.getBounds()._northEast.lng; //目前地圖右邊 精度
    let map_southWest_lat = map.getBounds()._southWest.lat; //目前地圖左邊 緯度
    let map_southWest_lng = map.getBounds()._southWest.lng; //目前地圖左邊 精度

    for (let i = 0; i < site_location.site.length; i++) 
    {
      let site_local_lat = site_location.location.lat[i];
      let site_local_lng = site_location.location.lng[i];
      //動態產生卡片
      if (map_southWest_lat <= site_local_lat & site_local_lat <= map_northEast_lat & map_southWest_lng <= site_local_lng & site_local_lng <= map_northEast_lng) 
      {
        if(saveArray.includes(i))
        {
          continue;
        }
        else
        {
          console.log(`${site_location.site[i]}在視野裡面`); //判斷視窗顯示時候,是否有show出景點
          createCard(i);
          saveArray.push(i);
        }
      }
      else
      {
        clearCard(i);
        delete saveArray[i];
      }
    }
  })

  //創造 地標
  for (let i = 0; i < site_location.site.length; i++)
    {
    L.marker([site_location.location.lat[i], site_location.location.lng[i]])
      .addTo(map)

      /*
      .bindPopup
      (`<a class='card flex-row rounded google-map-product-item w-100 '><img src='${site_location.mapimgsrc[i]}' class='w-100 rounded-start'><div class='card-body  position-relative'><h5 class='card-title mb-2'>${site_location.site[i]}</h5><p class='star text-info m-0'>★<span class='star-amount'>4.75</span></p><p class='card-text map-price m-0'>TWD <span class='text-info'>358</span></p></div></a>`);
  */
    }




//離島 東西 (經度) 北南 (緯度)
//基隆嶼燈塔 25.156652,121.7313924
//基隆城市博覽會 基隆之星海上展覽(國門廣場附近)  25.1319577,121.7379821
//桃園戶外休閒體驗營 | OBT 台灣外展 | 高空繩索  X   落羽松露營  24.8418952,121.1881965
//屏東 東港住宿 | 綠芳水岸民宿 | 距離東港碼頭僅需5分  22.4695792,120.4461174
//碰到卡片 跳跳跳
//碰到 local 標誌 會顯示 整張 card 



