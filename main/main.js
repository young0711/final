// 게임 진행 관련 변수
let day = 0; // 현재 일차
let cut = 0; // 현재 컷

// 카메라 관련 변수
let video;
let countdownNumber = 3;
let handDetected = false;

// 시작 버튼 관련 변수
let startBtnX = 400;
let startBtnY = 350;
let startBtnW = 400;
let startBtnH = 130;

// 엔딩 관련 변수
let endingPhase = 0; // 엔딩 단계
let endingStartTime = 0; // 단계 시작 시간
let endingImageIndex = 0; // 현재 보여줄 이미지 index
let currentDayLabel = ""; // 현재 day 텍스트
let showBlack = true; // 검은 화면 표시 여부
let currentDayIndex = 0; // 몇 번째 day 중인지 (0~4)
let dayLabels = ["Day 4", "Day 5", "Day 6", "Day 7", "Day 99+"]; // 표시할 day

// 쓰레기 투척 관련 변수
let thrownInCut = false; // 현재 컷에서 쓰레기를 던졌는지
let trashReady = false; // 캐릭터 중앙에 쓰레기 보여줄지 여부
let trashVisible = true; // 클릭 전까지 쓰레기 보이게

// 일차 전환 관련 변수
let dayTransition = false;
let dayTransitionStartTime = 0;
let dayTransitionDuration = 1000; // 1초 동안 표시

// 라면 먹기 관련 변수
let eatStage = 0; // 0: eateat0 또는 eateat1 번갈아 나오는 상태, 1: eateat2 고정된 상태
let eatTimer = 0; // 스페이스바 누른 횟수 카운트용
let eateatToggle = 0; // eateat0/eateat1 토글 (0 또는 1)

// 캐릭터 애니메이션 관련 변수
let person = []; // person 이미지 배열
let personFrame = 0; // 현재 person 프레임 index
let personAnimTimer = 0; // 프레임 바꿀 때 기준 frameCount

// 페이드 효과 관련 변수
let isFading = false;
let fadeAlpha = 0;
let fadeMode = "out"; // "out" 또는 "in"

// 눈 깜빡임 관련 변수
let blinkProgress = 0;
let blinkCount = 0;
let h = 400;

//UI
let hideOneOb = [false, false, false, false]; // 두 개의 oneOb 상태 저장
let showX = false;
let xTimer = 0;

let showOneObMessage = [false, false, false, false];
let oneObMessageTimer = [0, 0, 0, 0];

let showTumblerMessage = false;
let tumblerMessageTimer = 0;

let showBagMessage = false;
let bagMessageTimer = 0;

// 휴지 던지기 관련 변수
let landedTissues = []; // 착지한 휴지들의 좌표 저장용
let tissueCount = 0;
let tissueX = 100;
let tissueY = 300;
let isFlying = false;
let t = 0; // 시간 변수

// 휴지 투척 목표 좌표
let throwTargetX = 0;
let throwTargetY = 0;

// 착지한 휴지 좌표 배열
let landedTissueX = [];
let landedTissueY = [];

// 이미지 배열
let day4Images = [];
let day5Images = [];
let endingImages = [];

// 게임 진행 카운트
let count = 0; //라면 먹은 횟수
let lamyenCount = 0; //라면 이미지 관리

// 캐릭터 위치 및 움직임 관련 변수
let charX = 0;
let charYBase = 550;
let charWiggle = 0;
let charMoving = true;

// 게임 데이터
let days = []; // 하루는 여러 컷으로 구성되고, 전체는 days 배열로 관리

// 엔딩 특수 효과 관련 변수
let endZoom = 3.0; // 처음 확대 배율
let endZooming = true;

// 랜덤 텍스트 관련 변수
let specialChars = "*&^$%#@!~+-=[]{}|;:,.<>?/";
let randomText = "";
let textChangeTimer = 0;

// 사운드 변수
let bgm, walkSound, blinkSound, throwSound, eatSound;
let buttonClickSound, pageSound, endSound;
let endSoundPlayed = false; // endSound 재생 여부를 추적하는 전역 변수

// 초기 설정
function setup() {
  createCanvas(1200, 800);
  textSize(30);
  daysData(); // 컷 데이터 초기화

  // 카메라 초기화 -> 카메라를 가져오는 부분을 GPT에게 물어봐서 붙여넣었습니다다
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide(); // 비디오 요소 숨기기
}

// 이미지와 사운드 로드
function preload() {
  // 사운드 로드
  bgm = loadSound("sound/bgm.mp3");
  walkSound = loadSound("sound/walk.mp3");
  blinkSound = loadSound("sound/blink.mp3");
  throwSound = loadSound("sound/throw.mp3");
  eatSound = loadSound("sound/eat.mp3");
  buttonClickSound = loadSound("sound/bottonclick.mp3");
  pageSound = loadSound("sound/page.mp3");
  endSound = loadSound("sound/end.mp3");

  // 배경 이미지 로드
  bgImages = [
    [
      // day 0 (1일차)
      loadImage("background/day1_cut0 copy.jpg"),
      loadImage("background/day1_cut0.jpg"),
      loadImage("background/day1_cut1.jpg"),
      loadImage("background/day1_cut2.jpg"),
      loadImage("background/day1_cut3.jpg"),
    ],
    [
      // day 1 (2일차)
      loadImage("background/day2_cut1.jpg"),
      loadImage("background/day2_cut2.jpg"),
      loadImage("background/day2_cut3.jpg"),
    ],
    [
      // day 2 (3일차)
      loadImage("background/day3_cut1.jpg"),
      loadImage("background/day3_cut2.jpg"),
      loadImage("background/day3_cut3.jpg"),
      loadImage("background/day3_cut4.jpg"),
    ],
  ];

  // 라면 이미지 로드
  lamyenImgaes = [
    loadImage("lamyen/lamyen1.png"),
    loadImage("lamyen/lamyen2.png"),
    loadImage("lamyen/lamyen3.png"),
    loadImage("lamyen/lamyen4.png"),
  ];

  // 휴지 이미지 로드
  manyTissue = [
    loadImage("element/tissu1.png"),
    loadImage("element/tissu2.png"),
    loadImage("element/tissu3.png"),
  ];

  // 캐릭터 이미지 로드
  person = [
    loadImage("person/person1.png"),
    loadImage("person/person2.png"),
    loadImage("person/person3.png"),
  ];

  // 먹기 애니메이션 이미지 로드
  eateat = [
    loadImage("eat/eateat0.jpg"),
    loadImage("eat/eateat1.jpg"),
    loadImage("eat/eateat2.jpg"),
  ];

  // 엔딩 관련 이미지 로드
  day4Images = [
    loadImage("data/1.jpg"),
    loadImage("data/2.png"),
    loadImage("data/3.jpg"),
  ];
  day5Images = [
    loadImage("data/1.jpg"),
    loadImage("data/2.png"),
    loadImage("data/3.jpg"),
  ];
  endingImages = [
    loadImage("data/1.1.jpg"),
    loadImage("data/2.1.png"),
    loadImage("data/3.1.jpg"),
  ];

  // 효과 이미지 로드
  effectImages = [
    loadImage("data/12.png"),
    loadImage("data/13.png"),
    loadImage("data/14.jpg"),
    loadImage("data/15.jpg"),
    loadImage("data/16.jpg"),
  ];

  // 기타 이미지 로드
  tissue = loadImage("element/tissu.png");
  oneOb = loadImage("element/one.jpg");
  pcup = loadImage("element/pcup.png");
  straw = loadImage("element/straw.png");
  teeth = loadImage("element/teeth.png");
  stick = loadImage("element/stick.png");
  manyOb = loadImage("element/many.jpg");
  tumbler = loadImage("element/tumbler.png");
  bag = loadImage("element/bag.png");
  charImg = loadImage("element/character.png");
  endImage = loadImage("element/eart2.jpg");
  bin = loadImage("element/bin.png");
  startbg = loadImage("element/start_bg.png");
  start = loadImage("element/start.png");
  openeye = loadImage("element/open.jpg");
}

// 메인 드로잉 함수
function draw() {
  background(255);

  // 일차 전환 효과 처리
  if (dayTransition) {
    push();
    background(0);
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("Day " + (day + 1), width / 2, height / 2);

    // 시간이 지나면 전환 종료 -> 시간이 지나면 종료되는 부분에서 시간을 활용하는 방법을 몰라서 인공지능의 도움을 받았습니다.
    if (millis() - dayTransitionStartTime > dayTransitionDuration) {
      dayTransition = false;
    }
    pop();
    return; // 아래 부분은 실행하지 않음 (전환 화면만 보여줌)
  }

  // 현재 컷 실행
  if (days[day] && days[day][cut]) {
    days[day][cut]();
  } else {
    end();
  }

  // 페이드 인/아웃 효과
  if (isFading) {
    noStroke();
    fill(0, fadeAlpha);
    rect(0, 0, width, height);

    if (fadeMode === "out") {
      fadeAlpha += 15;
      if (fadeAlpha >= 255) {
        nextCut(); // 컷 바꾸기
        fadeMode = "in";
        fadeAlpha = 255;
      }
    } else if (fadeMode === "in") {
      fadeAlpha -= 15;
      if (fadeAlpha <= 0) {
        isFading = false;
        fadeAlpha = 0;
      }
    }
  }
  function drawChoiceBubble(txt, y, alpha) {
    //텍스트 길이에 맞춰서 말풍선 크기를 조절하고 싶어서 고민해봤지만 방법을 모르겠어서 인공지능의 도움을 받아 제작하였습니다.
    textSize(32);
    let tw = textWidth(txt) + 60;
    let th = 54;
    let tx = width / 2;
    let ty = y;
    push();
    rectMode(CENTER);
    noStroke();
    fill(255, alpha * 0.9);
    rect(tx, ty, tw, th, 30);
    pop();
    push();
    fill(0, alpha);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(txt, tx, ty);
    pop();
  }

  for (let i = 0; i < 4; i++) {
    //초를 관리하는 부분을 인공지능의 도움을 받아 제작하였습니다.
    if (showOneObMessage[i]) {
      let t = millis() - oneObMessageTimer[i];
      let alpha =
        t < 200
          ? map(t, 0, 200, 0, 255)
          : t > 900
          ? map(t, 900, 1200, 255, 0)
          : 255;

      let msg = "";
      if (day === 0) {
        if (i === 0) msg = "역시 물은 종이컵에 마셔야지";
        if (i === 1) msg = "빨때는 필수지지";
        if (i === 2) msg = "무조건 일회용으로로";
        if (i === 3) msg = "나무젓가락도 필수";
      } else if (day === 1) {
        if (i === 0) msg = "좀 많이 쓰는것 같은데 이게 편해";
        if (i === 1) msg = "빨때 또 사야겠다";
        if (i === 2) msg = "슬슬 칫솔 부족하지?";
        if (i === 3) msg = "이것도 이제 부족하네 많이 사야겠다";
      } else if (day === 2) {
        if (i === 0) msg = "종이컵이 편하긴해";
        if (i === 1) msg = "종이빨대는 무슨 ㅋㅋ";
        if (i === 2) msg = "칫솔은 많이 바꿔줘야해";
        if (i === 3) msg = "라면에는 필수야";
      }

      drawChoiceBubble(msg, 700, alpha);

      if (t > 1200) {
        showOneObMessage[i] = false;
      }
    }
  }

  if (showTumblerMessage) {
    let t = millis() - tumblerMessageTimer;
    let alpha =
      t < 200
        ? map(t, 0, 200, 0, 255)
        : t > 900
        ? map(t, 900, 1200, 255, 0)
        : 255;
    drawChoiceBubble("텀블러 무거워 불편해....", 700, alpha);
    if (t > 1200) showTumblerMessage = false;
  }

  // 가방 멘트
  if (showBagMessage) {
    let t = millis() - bagMessageTimer;
    let alpha =
      t < 200
        ? map(t, 0, 200, 0, 255)
        : t > 900
        ? map(t, 900, 1200, 255, 0)
        : 255;
    drawChoiceBubble("가방 귀찮아ㅡㅡ", 700, alpha);
    if (t > 1200) showBagMessage = false;
  }
  // 페이드 위에 텍스트 다시 그리기
  textOverlay();

  // 눈 깜빡이기 애니메이션
  if (day === 0 && cut === 1 && blinkCount < 3) {
    if (blinkCount === 0) {
      if (h <= 280) {
        blinkCount++;
      }
      h -= 5;
    }
    if (blinkCount === 1) {
      h += 1;
      if (h >= 380) {
        blinkCount++;
      }
    } else {
      h -= 7;
    }
  }

  // 'X' 표시 1초간 보여주기
  if (showX && millis() - xTimer < 1000) {
    push();
    textSize(100);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("X", width / 2, height / 2);
    pop();
  } else if (millis() - xTimer >= 1000) {
    showX = false;
  }

  // 캐릭터 움직임 처리 -> 움직임을 처리할때 위아래로 조금씩 움직이는 부분을 인공지능의 도움을 받아 제작하였습니다.
  if (
    (day === 0 && cut === 3) ||
    (day === 1 && cut === 1) ||
    (day === 2 && cut === 1)
  ) {
    if (charMoving) {
      if (charX < width / 2 - 150) {
        charX += 3;
        charWiggle = sin(frameCount * 0.3) * 5;
        // 캐릭터 이동중 -> 쓰레기 준비 X
        trashReady = false;
        trashVisible = true;

        // 프레임 10마다 person[1] <-> person[2] 반복
        if (frameCount - personAnimTimer > 10) {
          if (personFrame === 1) {
            personFrame = 2;
          } else {
            personFrame = 1;
          }
          personAnimTimer = frameCount;
        }
      } else {
        // 멈추면 person[0] 고정
        charMoving = false;
        personFrame = 0;
        // 캐릭터 멈췄을 때 쓰레기 준비 ON
        trashReady = true;
      }
    }

    image(person[personFrame], charX, charYBase + charWiggle, 150, 200);
  }

  // 쓰레기 표시
  if (
    (day === 0 && cut === 3) ||
    (day === 1 && cut === 1) ||
    (day === 2 && cut === 1)
  ) {
    if (trashReady && trashVisible && !thrownInCut) {
      // 캐릭터가 들고있는 쓰레기 표시
      image(tissue, 550, 620, 60, 90);
    }
  }

  // 착지한 휴지들 표시 -> 착지한 쓰레기를 표현하기 위해 인공지능의 도움을 받아 제작하였습니다.
  for (let i = 0; i < landedTissueX.length; i++) {
    image(tissue, landedTissueX[i], landedTissueY[i], 60, 90);
  }

  // 쓰레기 던지기 애니메이션 -> 자연스러운 포물선을 표현하기 위해 인공지능의 도움을 받아 제직하였습니다.
  if (isFlying) {
    let startX = charX + 50;
    let startY = charYBase + 50;

    // X좌표는 그대로 선형 보간
    let x = lerp(startX, throwTargetX, t);

    // Y좌표에 자연스러운 포물선 추가
    let baseY = lerp(startY, throwTargetY, t);
    let heightOffset = -300 * (t * (1 - t)); // 높이 조정 (-300 정도면 적당)

    let y = baseY + heightOffset;

    image(tissue, x, y, 60, 90);

    t += 0.02;

    if (t >= 1) {
      isFlying = false;
      t = 0;
      landedTissueX.push(throwTargetX);
      landedTissueY.push(throwTargetY);
    }
  }
  // 라면 먹기 화면 처리
  if (
    (day === 0 && cut === 4) ||
    (day === 1 && cut === 2) ||
    (day === 2 && cut === 2)
  ) {
    push();
    background(240);
    image(bgImages[day][cut], 0, 0, 1200, 800);

    // eateat 이미지 먼저 그림 (맨 아래에)
    if (eatStage === 0) {
      image(eateat[eateatToggle], 0, 0, 1200, 800);
    } else if (eatStage === 1) {
      image(eateat[2], 0, 0, 1200, 800);
    }

    // 라면과 휴지들은 eateat 위에 나오도록 기존대로 배치
    image(lamyenImgaes[lamyenCount], 520, 450, 150, 90);

    // 휴지 개수에 따른 이미지 표시
    if (lamyenCount >= 1 && tissueCount == 0) {
      image(manyTissue[tissueCount], 800, 450, 100, 100);
    }
    if (lamyenCount >= 1 && tissueCount == 1) {
      image(manyTissue[tissueCount], 760, 390, 200, 200);
    }
    if (lamyenCount >= 1 && tissueCount == 2) {
      image(manyTissue[tissueCount], 710, 400, 220, 220);
    }

    pop();

    textOverlay();
  }
}

// 텍스트 오버레이 함수
function textOverlay() {
  if (days[day] && days[day][cut]) {
    //drawCutText("텍스트 내용", x좌표, y좌표, 글씨크기, [R, G, B],글씨 굵기);
    if (day === 0 && cut === 0) {
      drawCutText(
        "제작자: 김상권,하마다 스즈카, 조영찬",
        400,
        130,
        30,
        [0, 0, 0]
      );
    } else if (day === 0 && cut === 1) {
    } else if (day === 0 && cut === 2) {
      drawCutText("day1", 50, 50);
    } else if (day === 0 && cut === 3) {
      drawCutText("day1", 50, 50);
    } else if (day === 0 && cut === 4) {
      drawCutText("day1", 50, 50);
    } else if (day === 1 && cut === 0) {
      drawCutText("day2", 50, 50);
    } else if (day === 1 && cut === 1) {
      drawCutText("day2", 50, 50);
    } else if (day === 1 && cut === 2) {
      drawCutText("day2", 50, 50);
    } else if (day === 2 && cut === 0) {
      drawCutText("day3", 50, 50);
    } else if (day === 2 && cut === 1) {
      drawCutText("day3", 50, 50);
    } else if (day === 2 && cut === 2) {
      drawCutText("day3", 50, 50);
    }
  }
}

// 컷 텍스트 그리기 함수
function drawCutText(txt, pX, pY, size = 30, colorVal = [255, 255, 255]) {
  push();
  fill(colorVal[0], colorVal[1], colorVal[2]); // 색상
  textSize(size); // 크기
  textAlign(LEFT, TOP);
  text(txt, pX, pY);
  pop();
}

// 키 입력 처리 함수
function keyPressed() {
  if (key === "g") {
    if (endingPhase === 15) {
      endingPhase = 16;
      specialTimer = millis();
    } else {
      isFading = true;
      fadeMode = "out";
      fadeAlpha = 0;
    }
  }
  if (
    (day === 0 && cut === 4) ||
    (day === 1 && cut === 2) ||
    (day === 2 && cut === 2)
  ) {
    if (key === " ") {
      eatSound.play();
      lamyenEat();
    }
  }
}

// 마우스 클릭 처리 함수
function mousePressed() {
  buttonClickSound.play();

  // 시작 버튼 클릭 처리
  if (day === 0 && cut === 0) {
    if (
      mouseX >= startBtnX &&
      mouseX <= startBtnX + startBtnW &&
      mouseY >= startBtnY &&
      mouseY <= startBtnY + startBtnH
    ) {
      isFading = true;
      fadeMode = "out";
      fadeAlpha = 0;
    }
  }

  // 라면 먹기 상태 초기화
  if (
    (day === 0 && cut === 4) ||
    (day === 1 && cut === 2) ||
    (day === 2 && cut === 2)
  ) {
    if (eatStage === 1) {
      eatStage = 0;
      eateatToggle = 0;
      eatTimer = 0;

      // 라면 단계 증가
      if (lamyenCount < 3) {
        lamyenCount++;
        if (lamyenCount >= 2) {
          tissueCount++;
        }
      }
    }
  }

  // 쓰레기 투척 처리
  if (
    (day === 0 && cut === 3) ||
    (day === 1 && cut === 1) ||
    (day === 2 && cut === 1)
  ) {
    if (trashReady && trashVisible && !thrownInCut && !isFlying) {
      if (mouseX >= 670 && mouseX <= 880 && mouseY >= 310 && mouseY <= 560) {
        xTimer = millis();
      } else {
        throwTargetX = mouseX;
        throwTargetY = mouseY;
        throwTissu();
      }
    }
  }

  // 일회용품 선택 처리
  if (
    (day === 0 && cut === 2) ||
    (day === 1 && cut === 0) ||
    (day === 2 && cut === 0)
  ) {
    // 첫 번째 oneOb 클릭
    if (
      !hideOneOb[0] &&
      mouseX >= 237 &&
      mouseX <= 337 &&
      mouseY >= 260 &&
      mouseY <= 405
    ) {
      hideOneOb[0] = true;
      showOneObMessage[0] = true;
      oneObMessageTimer[0] = millis();
    }
    // 두 번째 oneOb 클릭
    if (
      !hideOneOb[1] &&
      mouseX >= 381 &&
      mouseX <= 581 &&
      mouseY >= 235 &&
      mouseY <= 415
    ) {
      hideOneOb[1] = true;
      showOneObMessage[1] = true;
      oneObMessageTimer[1] = millis();
    }
    if (
      !hideOneOb[2] &&
      mouseX >= 647 &&
      mouseX <= 697 &&
      mouseY >= 225 &&
      mouseY <= 410
    ) {
      hideOneOb[2] = true;
      showOneObMessage[2] = true;
      oneObMessageTimer[2] = millis();
    }
    if (
      !hideOneOb[3] &&
      mouseX >= 845 &&
      mouseX <= 945 &&
      mouseY >= 250 &&
      mouseY <= 420
    ) {
      hideOneOb[3] = true;
      showOneObMessage[3] = true;
      oneObMessageTimer[3] = millis();
    }
    // manyOb 클릭
    if (mouseX >= 70 && mouseX <= 220 && mouseY >= 280 && mouseY <= 580) {
      showX = true;
      xTimer = millis();
      showTumblerMessage = true;
      tumblerMessageTimer = millis();
    }
    if (mouseX >= 1020 && mouseX <= 1170 && mouseY >= 320 && mouseY <= 620) {
      showX = true;
      xTimer = millis();
      showBagMessage = true;
      bagMessageTimer = millis();
    }
  }
}

// 쓰레기 던지기 함수
function throwTissu() {
  if (!isFlying && !thrownInCut) {
    throwSound.play();
    isFlying = true;
    t = 0;
    thrownInCut = true;
  }
}

// 라면 먹기 함수
function lamyenEat() {
  if (eatStage === 0) {
    eatTimer++;
    eateatToggle = 1 - eateatToggle; // 0 <-> 1 토글

    if (eatTimer >= 2) {
      eatStage = 1;
      eatTimer = 0;
    }
  }
}

// 게임 변수 초기화 함수
function resetGameVariables() {
  // 엔딩 관련 변수 초기화
  endingPhase = 0;
  endingStartTime = 0;
  endingImageIndex = 0;
  currentDayLabel = "";
  showBlack = true;
  currentDayIndex = 0;

  // 쓰레기 관련 변수 초기화
  thrownInCut = false;
  trashReady = false;
  trashVisible = true;
  tissueCount = 0;
  tissueX = 100;
  tissueY = 300;
  isFlying = false;
  t = 0;
  throwTargetX = 0;
  throwTargetY = 0;
  landedTissueX = [];
  landedTissueY = [];

  // 캐릭터 관련 변수 초기화
  charX = 0;
  charYBase = 550;
  charWiggle = 0;
  charMoving = true;
  personFrame = 0;
  personAnimTimer = 0;

  // 애니메이션 관련 변수 초기화
  isFading = false;
  fadeAlpha = 0;
  fadeMode = "out";
  blinkProgress = 0;
  blinkCount = 0;
  h = 400;

  // UI 관련 변수 초기화
  hideOneOb = [false, false];
  showX = false;
  xTimer = 0;

  // 게임 진행 관련 변수 초기화
  count = 0;
  lamyenCount = 0;
  eatStage = 0;
  eatTimer = 0;
  eateatToggle = 0;

  // 엔딩 특수 효과 변수 초기화
  specialPhase = undefined;
  specialTimer = 0;
  endZoom = 3.0;
  endZooming = true;
  randomText = "";
  textChangeTimer = 0;
}

// 다음 컷으로 전환하는 함수
function nextCut() {
  cut++;
  pageSound.play();

  // 컷이 바뀔 때마다 초기화해야 하는 변수들
  landedTissueX = [];
  landedTissueY = [];
  thrownInCut = false;
  trashReady = false;
  trashVisible = true;
  isFlying = false;
  t = 0;
  showX = false;
  xTimer = 0;

  if (cut >= days[day].length) {
    cut = 0;
    day++;

    if (day < days.length) {
      // day가 바뀔 때 모든 변수 초기화
      resetGameVariables();

      // Day 전환 효과 시작
      dayTransition = true;
      dayTransitionStartTime = millis();
    }
  }
}

// 컷 데이터 초기화 함수
function daysData() {
  // 1일차 컷
  let day1 = [
    function () {
      // 첫장면
      push();
      background(0);
      image(startbg, 0, 0, 1200, 800);

      // start 버튼
      imageMode(CORNER); // 필수 설정
      image(start, startBtnX, startBtnY, startBtnW, startBtnH);

      // hover 효과 (반투명 rect 덮기)
      if (
        mouseX >= startBtnX &&
        mouseX <= startBtnX + startBtnW &&
        mouseY >= startBtnY &&
        mouseY <= startBtnY + startBtnH
      ) {
        noStroke();
        fill(0, 0, 0, 30); // 투명한 검정
        rect(startBtnX, startBtnY, startBtnW, startBtnH, 50);
      }

      pop();
    },
    function () {
      //눈깜빡임
      push();
      lamyenCount = 0;
      background(200);
      image(bgImages[day][cut], 0, 0, 1200, 800);

      // 눈 깜빡임(검은 사각형 위아래 닫혔다 열리기)
      noStroke();
      fill(0);
      rect(0, 0, width, h); // 위쪽 눈꺼풀
      rect(0, height - h, width, h); // 아래쪽 눈꺼풀
      pop();

      // 자연스러운 멘트와 자동 컷 전환 -> 자연스러운 멘트와 자동 컷 전환을 구현하기 위해 인공지능을 사용해 구현하였습니다.
      if (typeof daysData.cut2Timer === "undefined") {
        daysData.cut2Timer = millis();
      }
      let elapsed = millis() - daysData.cut2Timer;
      if (elapsed < 6000) {
        push();
        fill(0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("아 잘 잤다 이제 준비를 해볼까", width / 2, height / 2 + 180);
        pop();
      }
      if (elapsed > 4000) {
        daysData.cut2Timer = undefined;
        nextCut();
        return;
      }
    },
    function () {
      //일회용품 선택
      push();
      lamyenCount = 0;
      background(200);
      image(bgImages[day][cut], 0, 0, 1200, 800);

      if (
        hideOneOb[0] === true &&
        hideOneOb[1] === true &&
        hideOneOb[2] === true &&
        hideOneOb[3] === true
      ) {
        nextCut();
      }

      if (!hideOneOb[0]) {
        image(pcup, 237, 260, 100, 145);
      }
      if (!hideOneOb[1]) {
        image(straw, 381, 235, 200, 180);
      }
      if (!hideOneOb[2]) {
        image(teeth, 647, 225, 50, 185);
      }
      if (!hideOneOb[3]) {
        image(stick, 845, 250, 100, 170);
      }
      image(tumbler, 70, 280, 150, 300);
      image(bag, 1020, 320, 150, 300);
      charMoving = true;
      pop();
    },
    function () {
      //쓰레기 길거리에 투척
      push();
      background(220);
      image(bgImages[day][cut], 0, 0, 1200, 800);
      image(bin, 670, 310, 250, 250);
      pop();

      // 말풍선 함수 정의 (컷 함수 내부에 위치) -> 위에 있는 것과 같습니다.
      function drawSpeechBubble(txt, y, alpha) {
        textSize(32);
        let tw = textWidth(txt) + 60;
        let th = 54;
        let tx = width / 2;
        let ty = y;
        push();
        rectMode(CENTER);
        noStroke();
        fill(255, alpha * 0.9);
        rect(tx, ty, tw, th, 30);
        pop();
        push();
        fill(0, alpha);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(txt, tx, ty);
        pop();
      }

      // person 이동 멈춤 감지 및 멘트/클릭 처리
      if (!this._mentState) {
        this._mentState = "wait"; // wait, bin, waitThrowEnd, throw, done
        this._mentTimer = 0;
        this._fade = 0;
      }
      // person 멈췄을 때 멘트 (throw 이후에는 다시 뜨지 않음)
      if (!charMoving && this._mentState === "wait") {
        if (this._mentTimer === 0) this._mentTimer = millis();
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble(
          "아 이거 다먹었는데 어디버리지 -> 마우스를 눌러서 버릴곳 선택",
          200,
          this._fade
        );
        // 클릭 대기
        if (t > 300) {
          if (mouseIsPressed && !this._clicked) {
            this._clicked = true;
            if (
              mouseX >= 670 &&
              mouseX <= 920 &&
              mouseY >= 310 &&
              mouseY <= 560
            ) {
              // bin 클릭
              this._mentState = "bin";
              this._mentTimer = millis();
              this._fade = 0;
            } else {
              // bin 이외 클릭
              throwTissu();
              this._mentState = "waitThrowEnd";
              this._clicked = false;
            }
          }
        }
      } else if (
        this._mentState !== "throw" &&
        this._mentState !== "waitThrowEnd"
      ) {
        this._clicked = false;
      }
      // 쓰레기 던지기 애니메이션 끝나면 throw 멘트로 전환
      if (this._mentState === "waitThrowEnd" && !isFlying) {
        this._mentState = "throw";
        this._mentTimer = millis();
        this._fade = 0;
      }
      // bin 멘트
      if (this._mentState === "bin") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble("아 저기까지 언제가", 200, this._fade);
        if (t > 2100) {
          this._mentState = "wait";
          this._mentTimer = 0;
          this._fade = 0;
        }
      }
      // throw 멘트
      if (this._mentState === "throw") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble("아 아무도 몰라 오늘 한번만", 200, this._fade);
        if (t > 2100) {
          // 0.5초 후 다음 컷으로
          if (!this._throwDone) {
            this._throwDone = millis();
          }
          if (millis() - this._throwDone > 500) {
            // 상태 명확히 초기화
            thrownInCut = false;
            trashVisible = true;
            trashReady = false;
            this._mentState = "done";
            this._mentTimer = 0;
            this._fade = 0;
            this._throwDone = undefined;
            nextCut();
            return;
          }
        } else {
          this._throwDone = undefined;
        }
      }
    },
    function () {
      //휴지낭비
      push();
      background(240);
      image(bgImages[day][cut], 0, 0, 1200, 800);
      pop();

      // tissueCount가 2일 때 0.5초 후 다음 컷으로 전환
      if (tissueCount === 2) {
        if (!this._tissueDone) {
          this._tissueDone = millis();
        }
        if (millis() - this._tissueDone > 1500) {
          nextCut();
          return;
        }
      } else {
        this._tissueDone = undefined;
      }
    },
  ];

  // 2일차 컷
  let day2 = [
    function () {
      //일회용품 선택
      push();
      lamyenCount = 0;
      background(200);
      image(bgImages[day][cut], 0, 0, 1200, 800);

      if (
        hideOneOb[0] === true &&
        hideOneOb[1] === true &&
        hideOneOb[2] === true &&
        hideOneOb[3] === true
      ) {
        nextCut();
      }

      if (!hideOneOb[0]) {
        image(pcup, 237, 260, 100, 145);
      }
      if (!hideOneOb[1]) {
        image(straw, 381, 235, 200, 180);
      }
      if (!hideOneOb[2]) {
        image(teeth, 647, 225, 50, 185);
      }
      if (!hideOneOb[3]) {
        image(stick, 845, 250, 100, 170);
      }
      image(tumbler, 70, 280, 150, 300);
      image(bag, 1020, 320, 150, 300);
      charMoving = true;
      pop();
    },
    function () {
      //쓰레기 길거리에 투척
      push();
      background(220);
      image(bgImages[day][cut], 0, 0, 1200, 800);
      image(bin, 670, 310, 250, 250);
      pop();

      // 말풍선 함수 정의 (컷 함수 내부에 위치)
      function drawSpeechBubble(txt, y, alpha) {
        textSize(32);
        let tw = textWidth(txt) + 60;
        let th = 54;
        let tx = width / 2;
        let ty = y;
        push();
        rectMode(CENTER);
        noStroke();
        fill(255, alpha * 0.9);
        rect(tx, ty, tw, th, 30);
        pop();
        push();
        fill(0, alpha);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(txt, tx, ty);
        pop();
      }

      // person 이동 멈춤 감지 및 멘트/클릭 처리
      if (!this._mentState) {
        this._mentState = "wait"; // wait, bin, waitThrowEnd, throw, done
        this._mentTimer = 0;
        this._fade = 0;
      }
      // person 멈췄을 때 멘트 (throw 이후에는 다시 뜨지 않음)
      if (!charMoving && this._mentState === "wait") {
        if (this._mentTimer === 0) this._mentTimer = millis();
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble(
          "오늘은 어디다가 버릴까..? -> 마우스를 눌러서 버릴곳 선택",
          200,
          this._fade
        );
        // 클릭 대기
        if (t > 300) {
          if (mouseIsPressed && !this._clicked) {
            this._clicked = true;
            if (
              mouseX >= 670 &&
              mouseX <= 920 &&
              mouseY >= 310 &&
              mouseY <= 560
            ) {
              // bin 클릭
              this._mentState = "bin";
              this._mentTimer = millis();
              this._fade = 0;
            } else {
              // bin 이외 클릭
              throwTissu();
              this._mentState = "waitThrowEnd";
              this._clicked = false;
            }
          }
        }
      } else if (
        this._mentState !== "throw" &&
        this._mentState !== "waitThrowEnd"
      ) {
        this._clicked = false;
      }
      // 쓰레기 던지기 애니메이션 끝나면 throw 멘트로 전환
      if (this._mentState === "waitThrowEnd" && !isFlying) {
        this._mentState = "throw";
        this._mentTimer = millis();
        this._fade = 0;
      }
      // bin 멘트
      if (this._mentState === "bin") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble(
          "쓰읍 하.. 저기 너무 멀어 동선 낭비야",
          200,
          this._fade
        );
        if (t > 2100) {
          this._mentState = "wait";
          this._mentTimer = 0;
          this._fade = 0;
        }
      }
      // throw 멘트
      if (this._mentState === "throw") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble("진짜 오늘까지만 ㅎㅎㅎ", 200, this._fade);
        if (t > 2100) {
          // 0.5초 후 다음 컷으로
          if (!this._throwDone) {
            this._throwDone = millis();
          }
          if (millis() - this._throwDone > 500) {
            // 상태 명확히 초기화
            thrownInCut = false;
            trashVisible = true;
            trashReady = false;
            this._mentState = "done";
            this._mentTimer = 0;
            this._fade = 0;
            this._throwDone = undefined;
            nextCut();
            return;
          }
        } else {
          this._throwDone = undefined;
        }
      }
    },
    function () {
      //휴지낭비
      push();
      background(240);
      image(bgImages[day][cut], 0, 0, 1200, 800);
      pop();

      // tissueCount가 2일 때 0.5초 후 다음 컷으로 전환
      if (tissueCount === 2) {
        if (!this._tissueDone) {
          this._tissueDone = millis();
        }
        if (millis() - this._tissueDone > 1500) {
          nextCut();
          return;
        }
      } else {
        this._tissueDone = undefined;
      }
    },
  ];

  // 3일차 컷
  let day3 = [
    function () {
      //일회용품 선택
      push();
      lamyenCount = 0;
      background(200);
      image(bgImages[day][cut], 0, 0, 1200, 800);

      if (
        hideOneOb[0] === true &&
        hideOneOb[1] === true &&
        hideOneOb[2] === true &&
        hideOneOb[3] === true
      ) {
        nextCut();
      }

      if (!hideOneOb[0]) {
        image(pcup, 237, 260, 100, 145);
      }
      if (!hideOneOb[1]) {
        image(straw, 381, 235, 200, 180);
      }
      if (!hideOneOb[2]) {
        image(teeth, 647, 225, 50, 185);
      }
      if (!hideOneOb[3]) {
        image(stick, 845, 250, 100, 170);
      }
      image(tumbler, 70, 280, 150, 300);
      image(bag, 1020, 320, 150, 300);
      charMoving = true;
      pop();
    },
    function () {
      //쓰레기 길거리에 투척
      push();
      background(220);
      image(bgImages[day][cut], 0, 0, 1200, 800);
      image(bin, 670, 310, 250, 250);
      pop();

      // 말풍선 함수 정의 (컷 함수 내부에 위치)
      function drawSpeechBubble(txt, y, alpha) {
        textSize(32);
        let tw = textWidth(txt) + 60;
        let th = 54;
        let tx = width / 2;
        let ty = y;
        push();
        rectMode(CENTER);
        noStroke();
        fill(255, alpha * 0.9);
        rect(tx, ty, tw, th, 30);
        pop();
        push();
        fill(0, alpha);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(txt, tx, ty);
        pop();
      }

      // person 이동 멈춤 감지 및 멘트/클릭 처리
      if (!this._mentState) {
        this._mentState = "wait"; // wait, bin, waitThrowEnd, throw, done
        this._mentTimer = 0;
        this._fade = 0;
      }
      // person 멈췄을 때 멘트 (throw 이후에는 다시 뜨지 않음)
      if (!charMoving && this._mentState === "wait") {
        if (this._mentTimer === 0) this._mentTimer = millis();
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble(
          "오늘은..아..음..-> 마우스를 눌러서 버릴곳 선택",
          200,
          this._fade
        );
        // 클릭 대기
        if (t > 300) {
          if (mouseIsPressed && !this._clicked) {
            this._clicked = true;
            if (
              mouseX >= 670 &&
              mouseX <= 920 &&
              mouseY >= 310 &&
              mouseY <= 560
            ) {
              // bin 클릭
              this._mentState = "bin";
              this._mentTimer = millis();
              this._fade = 0;
            } else {
              // bin 이외 클릭
              throwTissu();
              this._mentState = "waitThrowEnd";
              this._clicked = false;
            }
          }
        }
      } else if (
        this._mentState !== "throw" &&
        this._mentState !== "waitThrowEnd"
      ) {
        this._clicked = false;
      }
      // 쓰레기 던지기 애니메이션 끝나면 throw 멘트로 전환
      if (this._mentState === "waitThrowEnd" && !isFlying) {
        this._mentState = "throw";
        this._mentTimer = millis();
        this._fade = 0;
      }
      // bin 멘트
      if (this._mentState === "bin") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble("저기 이제 쓰지도 않아", 200, this._fade);
        if (t > 2100) {
          this._mentState = "wait";
          this._mentTimer = 0;
          this._fade = 0;
        }
      }
      // throw 멘트
      if (this._mentState === "throw") {
        let t = millis() - this._mentTimer;
        this._fade =
          t < 300
            ? map(t, 0, 300, 0, 255)
            : t > 1800
            ? map(t, 1800, 2100, 255, 0)
            : 255;
        drawSpeechBubble("다들 버리는데 그냥 버리자", 200, this._fade);
        if (t > 2100) {
          // 0.5초 후 다음 컷으로
          if (!this._throwDone) {
            this._throwDone = millis();
          }
          if (millis() - this._throwDone > 500) {
            // 상태 명확히 초기화
            thrownInCut = false;
            trashVisible = true;
            trashReady = false;
            this._mentState = "done";
            this._mentTimer = 0;
            this._fade = 0;
            this._throwDone = undefined;
            nextCut();
            return;
          }
        } else {
          this._throwDone = undefined;
        }
      }
    },
    function () {
      //휴지낭비
      push();
      background(240);
      image(bgImages[2][2], 0, 0, 1200, 800);
      pop();

      // tissueCount가 2일 때 0.5초 후 다음 컷으로 전환
      if (tissueCount === 2) {
        if (!this._tissueDone) {
          this._tissueDone = millis();
        }
        if (millis() - this._tissueDone > 1500) {
          nextCut();
          return;
        }
      } else {
        this._tissueDone = undefined;
      }
    },
  ];

  days = [day1, day2, day3];
}
//엔딩 -> 엔딩의 화려한 화면 전환과 캠을 사용하는 부분을 구현하기 위해 인공지능의 도움을 받았습니다.
function end() {
  // BGM 재생 (이미 재생 중이 아닐 때만)
  if (!endSound.isPlaying() && !endSoundPlayed) {
    endSound.play();
    endSoundPlayed = true;
  }

  push();
  background(0);

  if (endingPhase === 0) {
    background(0);
    fill(255);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(dayLabels[currentDayIndex], width / 2, height / 2);

    if (millis() - endingStartTime > 1000) {
      endingPhase = 1;
      endingStartTime = millis();
      endingImageIndex = 0;
      fadeAlpha = 0;
    }
  } else if (endingPhase === 1) {
    if (endingImageIndex < 3) {
      if (millis() - endingStartTime > 400) {
        endingStartTime = millis();
        endingImageIndex++;
        fadeAlpha = 0;
      }
      if (endingImageIndex < 3) {
        fadeAlpha = map(millis() - endingStartTime, 0, 400, 0, 255);
        fadeAlpha = constrain(fadeAlpha, 0, 255);

        push();
        tint(255, fadeAlpha);
        image(day4Images[endingImageIndex], 0, 0, width, height);
        pop();

        fill(255, fadeAlpha);
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Day " + (currentDayIndex + 4), width / 2, height / 2);
      }
    } else {
      currentDayIndex++;
      if (currentDayIndex >= dayLabels.length) {
        endingPhase = 10;
        endingStartTime = millis();
        endingImageIndex = 0;
        fadeAlpha = 0;
      } else {
        endingPhase = 1;
        endingStartTime = millis();
        endingImageIndex = 0;
        fadeAlpha = 0;
      }
    }
  } else if (endingPhase === 10) {
    if (endingImageIndex < endingImages.length) {
      if (millis() - endingStartTime > 1500) {
        endingStartTime = millis();
        endingImageIndex++;
        fadeAlpha = 0;
      }
      if (endingImageIndex < endingImages.length) {
        if (millis() - textChangeTimer > 100) {
          randomText = generateRandomText();
          textChangeTimer = millis();
        }

        fadeAlpha = map(millis() - endingStartTime, 0, 1500, 0, 255);
        fadeAlpha = constrain(fadeAlpha, 0, 255);

        push();
        tint(255, fadeAlpha);
        image(endingImages[endingImageIndex], 0, 0, width, height);
        pop();

        fill(255, fadeAlpha);
        textSize(100);
        textAlign(CENTER, CENTER);
        text("Day " + randomText, width / 2, height / 2);
      }
    } else {
      endingPhase = 11;
      specialPhase = 0;
      specialTimer = millis();
      endZoom = 2.5;
      endZooming = true;
      return;
    }
  } else if (endingPhase === 11) {
    if (typeof specialPhase === "undefined") {
      specialPhase = 0;
      specialTimer = millis();
      endZoom = 2.5;
      endZooming = true;
    }

    if (specialPhase === 0) {
      let elapsed = millis() - specialTimer;
      if (elapsed < 1000) {
        let scaleVal = 0.9 + 0.1 * Math.min(1, elapsed / 1000);
        let cx = width / 2,
          cy = height / 2;
        let alpha = 255;
        if (elapsed < 300) alpha = map(elapsed, 0, 300, 0, 255);
        else if (elapsed > 700) alpha = map(elapsed, 700, 1000, 255, 0);
        push();
        translate(cx, cy);
        scale(scaleVal);
        imageMode(CENTER);
        tint(255, alpha);
        image(effectImages[0], 0, 0, width, height);
        pop();
      } else if (elapsed < 1500) {
        let alpha = map(elapsed, 1000, 1500, 0, 255);
        fill(0, alpha);
        rect(0, 0, width, height);
      } else if (elapsed < 2000) {
        let alpha = map(elapsed, 1500, 2000, 255, 0);
        fill(0, alpha);
        rect(0, 0, width, height);
      } else if (elapsed < 3000) {
        let scaleVal2 = 0.9 + 0.1 * Math.min(1, (elapsed - 2000) / 1000);
        let cx = width / 2,
          cy = height / 2;
        let alpha = 255;
        if (elapsed < 2300) alpha = map(elapsed, 2000, 2300, 0, 255);
        else if (elapsed > 2700) alpha = map(elapsed, 2700, 3000, 255, 0);
        push();
        translate(cx, cy);
        scale(scaleVal2);
        imageMode(CENTER);
        tint(255, alpha);
        image(effectImages[1], 0, 0, width, height);
        pop();
      } else {
        specialPhase = 1;
        specialTimer = millis();
      }
    } else if (specialPhase === 1) {
      let elapsed = millis() - specialTimer;
      let idx = Math.floor(elapsed / 1000) % 2 === 0 ? 2 : 3;
      let phaseElapsed = elapsed % 1000;
      let alpha = 255;
      if (phaseElapsed < 300) alpha = map(phaseElapsed, 0, 300, 0, 255);
      else if (phaseElapsed > 700) alpha = map(phaseElapsed, 700, 1000, 255, 0);
      tint(255, alpha);
      image(effectImages[idx], 0, 0, width, height);
      noTint();
      if (elapsed > 3000) {
        specialPhase = 2;
        specialTimer = millis();
        endZoom = 3.5;
        endZooming = true;
      }
    } else if (specialPhase === 2) {
      let cx = 520,
        cy = 250;
      let elapsed = millis() - specialTimer;
      let fadeIn = 500,
        fadeOut = 500,
        total = Math.max(1, ((endZoom - 1) / 0.02) * 16.7);
      let alpha = 255;
      if (elapsed < fadeIn) alpha = map(elapsed, 0, fadeIn, 0, 255);
      else if (endZoom <= 1.05 && elapsed > total - fadeOut)
        alpha = map(elapsed, total - fadeOut, total, 255, 0);
      push();
      translate(cx, cy);
      scale(endZoom);
      imageMode(CENTER);
      tint(255, alpha);
      image(effectImages[3], 0, 0, width, height);
      pop();
      if (endZooming) {
        if (endZoom > 1) {
          endZoom -= 0.02;
        } else {
          endZoom = 1;
          endZooming = false;
          specialPhase = 3;
          specialTimer = millis();
        }
      }
    } else if (specialPhase === 3) {
      let elapsed = millis() - specialTimer;
      let alpha = 255;
      if (elapsed < 500) alpha = map(elapsed, 0, 500, 0, 255);
      tint(255, alpha);
      image(effectImages[4], 0, 0, width, height);
      noTint();

      // 마지막 이미지를 2초 동안 보여주고 다음 페이즈로
      if (elapsed >= 2000) {
        endingPhase = 12;
        specialTimer = millis();
      }
    }
  } else if (endingPhase === 12) {
    // 마지막 멘트와 페이드 아웃
    let elapsed = millis() - specialTimer;

    if (elapsed < 2000) {
      // 멘트 표시
      let alpha = 255;
      if (elapsed < 500) alpha = map(elapsed, 0, 500, 0, 255);
      else if (elapsed > 1500) alpha = map(elapsed, 1500, 2000, 255, 0);

      push();
      fill(255, alpha);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("어... 언제 이렇게 더러워졌지?", width / 2, height / 2);
      pop();
    } else if (elapsed < 3000) {
      // 페이드 아웃
      let alpha = map(elapsed, 2000, 3000, 0, 255);
      fill(0, alpha);
      rect(0, 0, width, height);
    } else {
      endingPhase = 13;
      specialTimer = millis();
      endZoom = 3.0;
      endZooming = true;
    }
  } else if (endingPhase === 13) {
    // eart2.jpg 확대/축소 효과
    let elapsed = millis() - specialTimer;
    let cx = width / 2;
    let cy = height / 2;

    if (endZooming) {
      if (endZoom > 1.0) {
        endZoom -= 0.02;
      } else {
        endZoom = 1.0;
        endZooming = false;
        endingPhase = 14;
        specialTimer = millis();
      }
    }

    push();
    translate(cx, cy);
    scale(endZoom);
    imageMode(CENTER);
    image(endImage, 0, 0, width, height);
    pop();

    // END 텍스트
    push();
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("END", width / 2, height / 2);
    pop();
  } else if (endingPhase === 14) {
    // 최종 페이드 아웃
    let elapsed = millis() - specialTimer;

    // 배경 이미지
    image(endImage, 0, 0, width, height);

    // END 텍스트
    push();
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("END", width / 2, height / 2);
    pop();

    // 검은색 사각형 페이드 인
    let alpha = map(elapsed, 0, 2000, 0, 255);
    fill(0, alpha);
    rect(0, 0, width, height);

    // 마지막 페이즈에서 endSound 중지
    if (endSound.isPlaying()) {
      endSound.stop();
    }

    // 2초 후에 첫 번째 메시지 화면으로 전환
    if (elapsed > 2000) {
      endingPhase = 15;
      specialTimer = millis();
    }
  } else if (endingPhase === 15) {
    // 첫 번째 메시지 화면 ("당신은 그런적 없습니까?")
    background(0);
    let elapsed = millis() - specialTimer;

    // 텍스트 페이드 인/아웃 효과
    let alpha = 255;
    if (elapsed < 1000) {
      alpha = map(elapsed, 0, 1000, 0, 255);
    } else if (elapsed > 3000) {
      alpha = map(elapsed, 3000, 4000, 255, 0);
    }

    push();
    fill(255, alpha);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("잠깐..당신은 그런적 없습니까..?", width / 2, height / 2);
    pop();

    // 4초 후에 두 번째 메시지 화면으로 전환
    if (elapsed > 4000) {
      endingPhase = 16;
      specialTimer = millis();
    }
  } else if (endingPhase === 16) {
    // 두 번째 메시지 화면 ("양심에 손을 얹어보세요")
    background(0);
    let elapsed = millis() - specialTimer;

    // 텍스트 페이드 인/아웃 효과
    let alpha = 255;
    if (elapsed < 1000) {
      alpha = map(elapsed, 0, 1000, 0, 255);
    } else if (elapsed > 3000) {
      alpha = map(elapsed, 3000, 4000, 255, 0);
    }

    push();
    fill(255, alpha);
    textSize(50);
    textAlign(CENTER, CENTER);
    text(
      "양심에 손을 얹어보세요..(카메라에 손 보여주기)",
      width / 2,
      height / 2
    );
    pop();

    // 4초 후에 카운트다운 화면으로 전환
    if (elapsed > 4000) {
      endingPhase = 17;
      specialTimer = millis();
      countdownNumber = 3;
    }
  } else if (endingPhase === 17) {
    // 카운트다운 화면
    background(0);
    let elapsed = millis() - specialTimer;

    // 카메라 화면 표시
    push();
    imageMode(CENTER);
    image(video, width / 2, height / 2, 640, 480);
    pop();

    // 카운트다운 숫자 표시
    push();
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    text(countdownNumber, width / 2, height / 2);
    pop();

    // 1초마다 카운트다운 숫자 감소
    if (elapsed > 1000) {
      countdownNumber--;
      specialTimer = millis();
      if (countdownNumber < 0) {
        endingPhase = 18;
        specialTimer = millis();
      }
    }
  } else if (endingPhase === 18) {
    // 팀원 메시지 화면
    background(0);
    let elapsed = millis() - specialTimer;

    // 메시지 페이드 인/아웃 효과
    let alpha = 255;
    if (elapsed < 1000) {
      alpha = map(elapsed, 0, 1000, 0, 255);
    } else if (elapsed > 8000) {
      alpha = map(elapsed, 8000, 9000, 255, 0);
    }

    push();
    fill(255, alpha);
    textSize(25);
    textAlign(CENTER, CENTER);

    // 스즈카 메시지
    text("스즈카", width / 2, 100);
    text(
      "「서로가 서로 보충하는 형태로 어려운 부분도 도와주고",
      width / 2,
      140
    );
    text("이렇게 자상한 멤버들과 함께 작업할 수 있었던 것에", width / 2, 180);
    text(
      "감사함과 멋진 작품을 만들 수 있어서 성취감을 느꼈습니다」",
      width / 2,
      220
    );

    // 김상권 메시지
    text("김상권", width / 2, 300);
    text(
      "이번 팀 프로젝트는 기획, 디자인, 개발 모든 과정에 참여하여",
      width / 2,
      340
    );
    text(
      "나의 역량을 확장하는 기회였다. 각 분야에 고루 참여하면서",
      width / 2,
      380
    );
    text(
      "내가 어떤 부분에서 더 성장해야 할지 명확히 알게 되었고",
      width / 2,
      420
    );
    text("동시에 팀원들과 서로의 부족한 점을 채워나가며", width / 2, 460);
    text("시너지를 낼 수 있었던 점이 가장 좋았다.", width / 2, 500);

    // 조영찬 메시지
    text("조영찬", width / 2, 600);
    text("처음 사용해보는 js를 사용해서 기획부터 개발까지", width / 2, 640);
    text(
      "모든 분야를 맡아서 하다보니 저에게는 큰 경험이 되었습니다.",
      width / 2,
      680
    );
    text("평소 미디어아트에 관심이 있었는데 이번 기회를 통해", width / 2, 720);
    text(
      "미디어아트를 직접 제작해보는 경험을 한 것 같아 좋았습니다.",
      width / 2,
      760
    );
    pop();

    // 9초 후에 AI 사용률 화면으로 전환
    if (elapsed > 5000) {
      endingPhase = 19;
      specialTimer = millis();
    }
  } else if (endingPhase === 19) {
    // AI 사용률 화면
    background(0);
    let elapsed = millis() - specialTimer;

    // 텍스트 페이드 인/아웃 효과
    let alpha = 255;
    if (elapsed < 1000) {
      alpha = map(elapsed, 0, 1000, 0, 255);
    } else if (elapsed > 4000) {
      alpha = map(elapsed, 4000, 5000, 255, 0);
    }

    push();
    fill(255, alpha);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("인공지능 사용 비율 70%", width / 2, height / 2 - 160);
    text(
      "sound.js : 저장된 사운드를 불러오는 방법 참고",
      width / 2,
      height / 2 - 80
    );
    text(
      "사진 (일회용품, 다회용품, 음식, 길거리 배경) :",
      width / 2,
      height / 2
    );
    text("open Ai를 사용하여 통일된 그림체 구현", width / 2, height / 2 + 40);
    text(
      "end () : 사용자의 몰입도를 위한 페이드 인, 페이드 아웃 기능",
      width / 2,
      height / 2 + 120
    );
    text(
      "drawSpeechBubble () : 텍스트 크기의 맞춘 말풍선 제작",
      width / 2,
      height / 2 + 200
    );
    text(
      "throwTissue () : 사용자가 원하는 지점에 쓰레기 던지기 기능 제작",
      width / 2,
      height / 2 + 280
    );
    pop();

    // 5초 후에 최종 종료
    if (elapsed > 5000) {
      endingPhase = 20;
    }
  }

  pop();
}

function generateRandomText() {
  let result = "";
  for (let i = 0; i < 15; i++) {
    result += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );
  }
  return result;
}
