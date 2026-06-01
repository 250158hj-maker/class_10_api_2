const PREFECTURE_FILE_PATH = "./data/prefectures.json";
const SEARCH_URL = "https://zipcloud.ibsnet.co.jp/api/search";

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
    const url = `${SEARCH_URL}?${query_param.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
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
    const data = await searchAddress(zipcode);

    if (data && data.results) {
      const results = data.results[0];
      document.getElementById("prefecture").value = results.prefcode;
      document.getElementById("city").value =
        results.address2 + results.address3;
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
