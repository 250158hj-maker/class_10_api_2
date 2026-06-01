const PREFECTURE_FILE_PATH = "./data/prefectures.json";
const SEARCH_URI = "https://zipcloud.ibsnet.co.jp/api/search";

const errorDisplay = document.getElementById("error");
const loadingModal = document.getElementById("loading-modal");

// 都道府県JSON読み込み
const loadPrefectures = async () => {
  try {
    const response = await fetch(PREFECTURE_FILE_PATH);
    if (!response.ok) {
      errorDisplay.innerHTML = "都道府県読み込みエラー";
      return;
    }
    const prefectures = await response.json();

    // 都道府県プルダウン作成
    renderPrefectures(prefectures);
  } catch (error) {
    errorDisplay.innerHTML = error;
  }
};

// 都道府県プルダウン作成
const renderPrefectures = prefectures => {
  prefectures.forEach(prefecture => {
    let option = document.createElement("option");
    option.value = prefecture.code;
    option.textContent = prefecture.name;
    document.getElementById("prefecture").appendChild(option);
  });
};

// 郵便番号検索
const searchAddress = async zipcode => {
  try {
    const query_param = new URLSearchParams({ zipcode: zipcode });
    // TODO: SEARCH_URI に zipcode を追加
    const uri = SEARCH_URI;
    console.log(uri);
    // TODO: fetch(): 郵便番号検索APIにアクセス（非同期）
    const response = {};
    // TODO: JSONデータを変換（非同期）
    const data = {};
    return data;
  } catch (error) {
    errorDisplay.innerHTML = error;
  }
};

const searchHandler = async () => {
  const zipcode = document.getElementById("zipcode").value;
  if (!zipcode) {
    errorDisplay.innerHTML = "郵便番号を入力してください";
    return;
  }

  errorDisplay.innerHTML = "";

  try {
    // TODO: 郵便番号検索APIにアクセス
    const data = await searchAddress(zipcode);

    if (data && data.results) {
      const results = data.results[0];
      // TODO: value に都道府県コード設定: prefcode
      document.getElementById("prefecture").value = "";
      // TODO: テキストに住所設定: address2, address3
      document.getElementById("city").value = "";
    } else {
      errorDisplay.innerHTML = data.message || "住所が見つかりませんでした";
    }
  } catch (e) {
    errorDisplay.innerHTML = "通信エラーが発生しました";
  } finally {
    setTimeout(() => {
      loadingModal.classList.add("hidden");
    }, 500);
  }
};

(() => {
  loadPrefectures();
})();
