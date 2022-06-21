<template>
  <el-container direction="vertical" class="black-type">
    <div class="islogin-bg" v-if="isLoginFlag" @click="isLoginFuc"></div>
    <div class="page" :class="{'show-menu':showMenu,'show-wallet':showHistory}">
      <div
        class="heartNum"
        :class="{'c-green2':heartNum<=100,'c-yellow':(heartNum<460&&heartNum>100),'c-red':heartNum>460}"
      >
        {{ heartNum }}
        <span>ms</span>
      </div>
      <el-row class="choose-type" :gutter="20">
        <el-col :span="4" class="menu-area">
          <span class="logo" v-if="!auth" @click="logout()">
            <!-- <img src="/tx/tx11.jpg" /> -->
            <img src="/img/logo512.png">
          </span>
          <span v-else class="logo" @click="showMenu=true">
            <!-- <img :src="avatar_tx" /> -->
            <img src="/img/logo512.png">
          </span>
        </el-col>
        <el-col :span="16">
          <div class="exchange-box">
            <!-- <div class="exchange-wrap" @click="showExchange = !showExchange"> -->
            <div class="exchange-wrap">
              <span class="exchange-select" v-show="chartType==1">
                <!-- <i class="icon-coin icon-BTC"></i> -->
                <!-- <strong class="f-14 fb c-orange ff-sbrm">
                  BitCoin
                </strong>-->
                <!-- <strong class="f-14 ff-sbrm c-gray" style="margin-left: -6px;">1992</strong> -->
                <strong class="f-18 fb c-fff ff-sbrm">
                  RIGHT
                  <span class="c-orange">WIN</span>
                </strong>
              </span>
              <!-- <span class="exchange-select" v-show="chartType==2">
                <i class="icon-coin icon-ETH"></i>
                <strong class="f-16 fb">
                  Ethereum
                </strong>
              </span>
              <i
                class="exchange-icon"
                :class="{'el-icon-arrow-down':!showExchange,'el-icon-arrow-up':showExchange}"
              ></i>-->
            </div>
            <div class="exchange-pop" :class="{show:showExchange}">
              <el-link class="btn btn-exchange" @click="change('btc')">
                <i class="icon-coin icon-BTC"></i>
                <div class="f-16 fb">BitCoin</div>
              </el-link>
              <el-link class="btn btn-exchange" @click="change('eth')">
                <i class="icon-coin icon-ETH"></i>
                <div class="f-16 fb">Ethereum</div>
              </el-link>
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="more-option">
          <span v-if="auth" @click="getHistory(1)" class="more-icon">
            <img src="/img/jy@2x.png">
          </span>
          <span v-else @click="logout()" class="more-icon">
            <img src="/img/jy@2x.png">
          </span>
        </el-col>
        <div class="down-tips" v-show="showDownTips && !auth">
          <div class="down-logo">
            <img src="/img/logo36.png">
          </div>
          <div>
            <div class="f-16 pt-5">{{ $t('minoption.down_tips') }}</div>
            <div class="f-11">{{ $t('share.share_tips') }}</div>
          </div>
          <span class="down-btn" @click="showAddTips()">{{ $t('minoption.down_btn') }}</span>
          <i class="el-icon-caret-top"></i>
          <i class="el-icon-close" @click="closeAddTips()"></i>
        </div>
        <div class="show-add-bg" v-show="showAddTipsBg">
          <i class="el-icon-close" @click="closeAddTips()"></i>
        </div>
        <!-- 账号切换 -->
        <div class="my-wallet">
          <!-- <div class="my-wallet" :class="{show:showWallet}"> -->
          <div class="wallet-bg" @click="showWallet=false"></div>
          <div class="wallet-content">
            <div>{{ $t('minoption.my_wallet') }}</div>
            <div @click="chooseAccount(4)">
              <el-row class="wallet-list">
                <el-col :span="2">
                  <i class="icon-coin icon-USDT"></i>
                </el-col>
                <el-col :span="14">
                  <div>{{ $t('minoption.usdt_account') }}</div>
                  <!-- <div class="f-15 c-green">{{ practice | fix2 }}</div> -->
                  <div class="f-15 c-green">{{practice}}</div>
                </el-col>
                <el-col :span="8">
                  <nuxt-link to="/depositlast" class="btn btn-gray">{{ $t('minoption.deposit') }}</nuxt-link>
                </el-col>
              </el-row>
            </div>
            <div @click="chooseAccount(5)">
              <el-row class="wallet-list">
                <el-col :span="2">
                  <i class="icon-coin icon-P">P</i>
                </el-col>
                <el-col :span="14">
                  <div>{{ $t('minoption.practice_account') }}</div>
                  <div class="f-15 c-white">{{ virtualAccount }}</div>
                </el-col>
                <!-- 暂无模拟盘 -->
                <!-- <el-col :span="8">
                  <el-link
                    class="btn btn-gray"
                    @click="resetAccount()"
                    v-if="virtualAccount<=0"
                  >{{ $t('minoption.get') }}</el-link>
                </el-col> -->
              </el-row>
            </div>
          </div>
        </div>
      </el-row>
      <el-row class="account-wrap">
        <el-col :span="8" style="padding:0 10px">
          <div class="f-14 c-fff ws-n">
            <i class="icon-coin icon-BTC" style="top:-1px;"></i>
            <span class="total-price-pool">
              <span class="total-price-pool-type ff-sbrm f-14">BitCoin/USDT</span>
            </span>
          </div>
        </el-col>
        <el-col :span="16">
          <!-- 点击账号切换区域 -->
            <div class="change-account-btn-box">
              <div class="account-show-btn">
                <span class="account-icon rwt tit-icon"
                v-if="nowAccountType==4"
                ></span>
                <span class="account-icon rwd tit-icon"
                v-else
                ></span>
                <span
                  class="account-change-info c-fff c-14 ff-sbrm c-orange"
                  @click="showWalletbtn()"
                  v-if="nowAccountType==4">
                  {{ $t('leftMenu.RWTdb') }} {{ practice }}
                </span>
                <span 
                  class="account-change-info c-fff c-14 ff-sbrm" 
                  @click="showWalletbtn()"
                  v-else>
                  {{ $t('leftMenu.RWDjf') }} {{ virtualAccount }}
                </span>
                <span class="arrow-down-second-box">
                  <i class="arrow-down-second" :class="{active:showWallet}"></i>
                </span>
              </div>
              <!-- 账号切换区域 -->
              <div class="account-box" :class="{show:showWallet}">
                <div class="wallet-bg" @click="showWallet=false"></div>
                <ul class="c-fff f-14 ff-sbrm">
                  <li @click="chooseAccount(4)">
                    <p>
                      <span class="account-icon rwt"></span>
                      <span class="c-orange">{{ $t('leftMenu.RWTdb') }} {{ practice }}</span>
                    </p>
                  </li>
                  <li @click="chooseAccount(5)">
                    <p>
                      <span class="account-icon rwd"></span>
                      <span>{{ $t('leftMenu.RWDjf') }} {{ virtualAccount }}</span>
                    </p>
                    <p class="c-orange f-11 fr-tip">{{ $t('leftMenu.dailyscore') }} </p>
                    <strong class="getBtn ff-pfsc f-12 t-c" v-if="jfSelected == false" 
@click="jfSelectedFuc()">{{ $t('minoption.jfNoSelected')}}</strong>
                    <strong class="getBtn ff-pfsc f-12 t-c jf-selected" v-else>{{ $t('minoption.jfIsselected')}}</strong>
                  </li>
                </ul>
              </div>
            </div>
        </el-col>
        <div class="deposit-btn-box">
          <nuxt-link to="/depositlast" class="deposit-btn t-c">
            <!-- <i class="figure figure-lt"></i>
            <i class="figure figure-rt"></i>
            <i class="figure figure-lb"></i>
            <i class="figure figure-rb"></i> -->
            {{ $t('minoption.deposit') }}
          </nuxt-link>
        </div>
      </el-row>
      <!-- <el-row class="account-wrap" v-if="nowAccountType==5">
        <el-col :span="18">
          <div class="account-info">
            <i class="el-icon-arrow-down-second" :class="{active:showWallet}"></i>
            <div class="f-11 c-fff ws-n">
              <i class="icon-coin icon-BTC"></i>
              <span
                class="f-r"
                @click="showWalletbtn()"
              >{{ $t('minoption.practice_account') }} {{ virtualAccount | fix2 }}</span>
              <span class="f-r icon-t">T</span>
              <span class="total-price-pool" @click="showWalletbtn()">
                <span class="total-price-pool-type">BitCoin/USDT</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <nuxt-link to="/depositlast">
            <el-link class="btn btn-green ft-sb">
              <i class="figure figure-lt"></i>
              <i class="figure figure-rt"></i>
              <i class="figure figure-lb"></i>
              <i class="figure figure-rb"></i>
              <span class="c-orange">{{ $t('minoption.deposit') }}</span>
            </el-link>
          </nuxt-link>
        </el-col>
      </el-row> -->
      <el-row class="vh100">
        <el-col>
          <div class="main-box">
            <div class="charts-box">
              <x-chart
                :id="chartId"
                class="high-chart"
                :newdata="newdata"
                :option="option"
                :nowAccountType="nowAccountType"
                :needRedraw="needRedraw"
                :decimals="4"
                v-on:resetInit="initPage($event)"
                v-on:settlement="settlementDetail($event)"
                v-on:win="winAccount($event)"
                v-on:loginStatus="changeLoginStatus($event)"
              ></x-chart>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="shadow-pop" @click="closePop()" v-if="showMenu || showHistory"></div>
    </div>
    <div class="menu-box">
      <div class="box-bg" @click="showMenu=false"></div>
      <div class="avatar">
        <el-row>
          <el-col :span="6">
            <span class="avatar_photo" style="margin-left:-20px">
              <!-- <img :src="avatar_tx" /> -->
              <img src="/img/logo512.png">
            </span>
          </el-col>
          <el-col :span="18" class="t-l" style="margin-left:-8px">
            <div class="pt-5 f-14 color-w ff-pfscr">
              <!-- 平台用户 -->
              <!-- <span class="user-id f-15 ff-sbrm">{{ userInfo.user_id | showUserId }}</span>
               -->
               <span class="user-id f-15 ff-sbrm">{{ user_id | showUserId }}</span>
              <span class="verfied-type has-verfied" v-if="kycState==2">
                <img src="/img/rz.png">
              </span>
              <nuxt-link
                v-else
                class="verfied-type"
                :to="kycStateUrl"
              >{{ $t('kyc.state-'+kycState) }}</nuxt-link>
            <div class="pt-5 c-gray" style="font-size:12px">{{ accountName }}</div>
            </div>
          </el-col>
        </el-row>
        <div class="menu-account t-l">
          <el-row class="menu-area-box">
            <el-col :span="12">
              <div class="c-gray f-16">{{$t('leftMenu.RWTdb')}}</div>
              <div class="f-13 ff-sbrm f-16">{{ practice }}</div>
              <nuxt-link to="/depositlast" class="deposit-btn t-c">
                {{ $t('minoption.deposit') }}
              </nuxt-link >
            </el-col>
            <el-col :span="12">
              <div class="c-gray f-16">
                {{$t('leftMenu.RWDjf')}}
                <!-- <i class="help-icon">i</i> -->
              </div>
              <div class="f-13 ff-sbrm f-16">{{virtualAccount }}</div>
                <strong class="getBtn ff-pfsc f-12 t-c" v-if="jfSelected == false" 
@click="jfSelectedFuc()">{{ $t('minoption.jfNoSelected')}}</strong>
                <strong class="getBtn ff-pfsc f-12 t-c jf-selected" v-else>{{ $t('minoption.jfIsselected')}}</strong>
            </el-col>
            <!-- <el-col :span="8">
              <div class="c-gray f-16 t-c">USDT</div>
              <div class="f-13 t-c ff-sbrm f-16">{{ practice | fix4 }}</div>
            </el-col>-->
          </el-row>
          <!-- <nuxt-link to="/depositlast" class="btn btn-orange">
            <i class="figure figure-lt"></i>
            <i class="figure figure-rt"></i>
            <i class="figure figure-lb"></i>
            <i class="figure figure-rb"></i>
            <i class="icon-money"></i>
            {{ $t('minoption.deposit') }}
          </nuxt-link> -->
        </div>
      </div>
      <ul>
        <!-- <li>
          <nuxt-link to="/personal" class="menu-icon icon-1">个人信息</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/depositnew" class="menu-icon icon-2">数字钱包</nuxt-link>
        </li>-->
        <!-- <li>
          <nuxt-link to="/withdrawnew" class="menu-icon icon-3">资产兑换</nuxt-link>
        </li>-->
       
        <li>
          <nuxt-link  class="menu-icon icon-news" :to="{name:'newInformation'}">{{ $t('leftMenu.newInformation') }}</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name:'customerservice'}"class="menu-icon icon-4">{{ $t('leftMenu.customerservice') }}</nuxt-link>
          <!-- <a href="/customerservice" class="menu-icon icon-4">{{ $t('leftMenu.customerservice') }}</a> -->
        </li>
        <li>
          <nuxt-link to="/option" class="menu-icon">
            <i class="option-icon" style="margin:0 -2px 0 -28px">
              <svg
                t="1571664732053"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2511"
                width="24"
                height="24"
              >
                <path
                  d="M828.8 556.8l-36.8-22.4c0-8 1.6-14.4 1.6-22.4s0-14.4-1.6-22.4l36.8-22.4c30.4-17.6 41.6-57.6 24-88l-56-97.6c-11.2-20.8-33.6-32-56-32-11.2 0-22.4 3.2-32 8L672 278.4c-12.8-8-25.6-16-38.4-22.4v-43.2c0-35.2-28.8-64-64-64h-112c-35.2 0-64 28.8-64 64V256c-14.4 6.4-27.2 14.4-38.4 22.4l-36.8-20.8c-9.6-6.4-20.8-8-32-8-22.4 0-43.2 11.2-56 32l-56 97.6c-17.6 30.4-6.4 70.4 24 88l36.8 22.4c0 8-1.6 14.4-1.6 22.4s0 14.4 1.6 22.4l-36.8 22.4c-30.4 17.6-41.6 57.6-24 88l56 97.6c11.2 20.8 33.6 32 56 32 11.2 0 22.4-3.2 32-8l36.8-20.8c12.8 8 25.6 16 38.4 22.4v43.2c0 35.2 28.8 64 64 64h112c35.2 0 64-28.8 64-64V768c14.4-6.4 27.2-14.4 38.4-22.4l36.8 20.8c9.6 6.4 20.8 8 32 8 22.4 0 43.2-11.2 56-32l56-97.6c16-32 6.4-70.4-24-88z m-19.2 62.4l-56 97.6c-3.2 4.8-8 8-14.4 8-3.2 0-4.8 0-8-1.6l-36.8-20.8-25.6-14.4-25.6 17.6c-9.6 6.4-20.8 12.8-32 19.2l-27.2 12.8v73.6c0 9.6-6.4 16-16 16h-112c-9.6 0-16-6.4-16-16v-73.6l-27.2-12.8c-11.2-6.4-22.4-11.2-32-19.2L355.2 688l-25.6 14.4-36.8 20.8c-3.2 1.6-4.8 1.6-8 1.6-6.4 0-11.2-3.2-14.4-8l-56-97.6c-3.2-4.8-1.6-9.6-1.6-12.8s3.2-6.4 8-9.6l36.8-22.4 25.6-14.4-3.2-30.4c0-6.4-1.6-12.8-1.6-19.2s0-12.8 1.6-19.2l3.2-30.4-25.6-12.8-36.8-22.4c-8-4.8-9.6-14.4-6.4-22.4l56-97.6c3.2-4.8 8-8 14.4-8 3.2 0 4.8 0 8 1.6l36.8 20.8 25.6 14.4 25.6-17.6c9.6-6.4 20.8-12.8 32-19.2l27.2-12.8v-73.6c0-9.6 6.4-16 16-16h112c9.6 0 16 6.4 16 16v73.6l27.2 12.8c11.2 6.4 22.4 11.2 32 19.2l25.6 17.6 25.6-14.4 36.8-20.8c3.2-1.6 4.8-1.6 8-1.6 6.4 0 11.2 3.2 14.4 8l56 97.6c4.8 8 1.6 17.6-6.4 22.4L766.4 448l-25.6 14.4 3.2 30.4c0 6.4 1.6 12.8 1.6 19.2s0 12.8-1.6 19.2l-3.2 30.4 25.6 14.4 36.8 22.4c4.8 3.2 6.4 8 8 9.6s1.6 6.4-1.6 11.2z"
                  p-id="2512"
                  fill="#999999"
                ></path>
                <path
                  d="M512 392c-65.6 0-120 54.4-120 120s54.4 120 120 120 120-54.4 120-120-54.4-120-120-120z m0 192c-40 0-72-32-72-72s32-72 72-72 72 32 72 72-32 72-72 72z"
                  p-id="2513"
                  fill="#999999"
                ></path>
              </svg>
            </i>
            {{ $t('leftMenu.option') }}
          </nuxt-link>
        </li>
        <li v-if="auth"></li>
      </ul>
      <!-- 底部设置区域 -->
      <div class="bottom-option-box" style="display:none;">
        <div class="bottom-option">
          <el-row>
            <el-col :span="12">
              <el-link @click="logout()">
                <i class="logout-icon"></i>
                <span class="c-gray">{{ $t('minoption.login_out_link') }}</span>
              </el-link>
            </el-col>
            <el-col :span="12">
              <nuxt-link to="/option">
                <i class="option-icon">
                  <svg
                    t="1571664732053"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2511"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M828.8 556.8l-36.8-22.4c0-8 1.6-14.4 1.6-22.4s0-14.4-1.6-22.4l36.8-22.4c30.4-17.6 41.6-57.6 24-88l-56-97.6c-11.2-20.8-33.6-32-56-32-11.2 0-22.4 3.2-32 8L672 278.4c-12.8-8-25.6-16-38.4-22.4v-43.2c0-35.2-28.8-64-64-64h-112c-35.2 0-64 28.8-64 64V256c-14.4 6.4-27.2 14.4-38.4 22.4l-36.8-20.8c-9.6-6.4-20.8-8-32-8-22.4 0-43.2 11.2-56 32l-56 97.6c-17.6 30.4-6.4 70.4 24 88l36.8 22.4c0 8-1.6 14.4-1.6 22.4s0 14.4 1.6 22.4l-36.8 22.4c-30.4 17.6-41.6 57.6-24 88l56 97.6c11.2 20.8 33.6 32 56 32 11.2 0 22.4-3.2 32-8l36.8-20.8c12.8 8 25.6 16 38.4 22.4v43.2c0 35.2 28.8 64 64 64h112c35.2 0 64-28.8 64-64V768c14.4-6.4 27.2-14.4 38.4-22.4l36.8 20.8c9.6 6.4 20.8 8 32 8 22.4 0 43.2-11.2 56-32l56-97.6c16-32 6.4-70.4-24-88z m-19.2 62.4l-56 97.6c-3.2 4.8-8 8-14.4 8-3.2 0-4.8 0-8-1.6l-36.8-20.8-25.6-14.4-25.6 17.6c-9.6 6.4-20.8 12.8-32 19.2l-27.2 12.8v73.6c0 9.6-6.4 16-16 16h-112c-9.6 0-16-6.4-16-16v-73.6l-27.2-12.8c-11.2-6.4-22.4-11.2-32-19.2L355.2 688l-25.6 14.4-36.8 20.8c-3.2 1.6-4.8 1.6-8 1.6-6.4 0-11.2-3.2-14.4-8l-56-97.6c-3.2-4.8-1.6-9.6-1.6-12.8s3.2-6.4 8-9.6l36.8-22.4 25.6-14.4-3.2-30.4c0-6.4-1.6-12.8-1.6-19.2s0-12.8 1.6-19.2l3.2-30.4-25.6-12.8-36.8-22.4c-8-4.8-9.6-14.4-6.4-22.4l56-97.6c3.2-4.8 8-8 14.4-8 3.2 0 4.8 0 8 1.6l36.8 20.8 25.6 14.4 25.6-17.6c9.6-6.4 20.8-12.8 32-19.2l27.2-12.8v-73.6c0-9.6 6.4-16 16-16h112c9.6 0 16 6.4 16 16v73.6l27.2 12.8c11.2 6.4 22.4 11.2 32 19.2l25.6 17.6 25.6-14.4 36.8-20.8c3.2-1.6 4.8-1.6 8-1.6 6.4 0 11.2 3.2 14.4 8l56 97.6c4.8 8 1.6 17.6-6.4 22.4L766.4 448l-25.6 14.4 3.2 30.4c0 6.4 1.6 12.8 1.6 19.2s0 12.8-1.6 19.2l-3.2 30.4 25.6 14.4 36.8 22.4c4.8 3.2 6.4 8 8 9.6s1.6 6.4-1.6 11.2z"
                      p-id="2512"
                      fill="#999999"
                    ></path>
                    <path
                      d="M512 392c-65.6 0-120 54.4-120 120s54.4 120 120 120 120-54.4 120-120-54.4-120-120-120z m0 192c-40 0-72-32-72-72s32-72 72-72 72 32 72 72-32 72-72 72z"
                      p-id="2513"
                      fill="#999999"
                    ></path>
                  </svg>
                </i>
                <!-- <span class="c-gray">{{ $t('minoption.option') }}</span> -->
              </nuxt-link>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="history-box">
      <div class="box-bg" @click="showHistory=false"></div>
      <div class="history-title">{{ $t('minoption.trade_history') }}</div>
      <!-- 隐藏交易历史记录tab区域 -->
      <el-dropdown @command="handleType" placement="bottom" trigger="click" :tabindex="1" style="display:none;">
        <span class="el-dropdown-link change-history">
          <span v-if="historyType==1">BTC/USDT</span>
          <span v-else>ETH/USDT</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">BTC/USDT</el-dropdown-item>
          <el-dropdown-item command="2">ETH/USDT</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 横线 -->
      <div style="border-bottom: 1px solid #232d3d;"></div>
      <ul class="history-list">
        <li v-for="list in historyList" :key="list.id">
          <el-row>
            <el-col :span="6">
              <div class="f-13 ff-sbrm">{{ list.createdAt | formatMS }}</div>
              <div class="c-gray f-9">{{ list.createdAt | formatMD }}</div>
            </el-col>
            <el-col :span="18" class="t-r">
              <span v-if="list.status==1">
                <div class="c-gray f-13 ff-sbrm">{{ $t('minoption.open_contract') }}</div>
                <div
                  class="c-btn-green"
                  v-if="list.tradeType==0"
                >{{ $t('minoption.higher') }} {{ list.amount | fix2 }}</div>
                <div class="c-red" v-else>{{ $t('minoption.lower') }} {{ list.amount | fix2 }}</div>
              </span>
              <span v-if="list.status==2">
                <div class="c-gray f-13 ff-sbrm">{{ $t('minoption.sellet_contract') }}</div>
                <div
                  class="c-btn-green"
                  v-if="list.tradeType==0"
                >{{$t('minoption.higher')}} {{ list.amount | fix2 }}</div>
                <div class="c-red" v-else>{{ $t('minoption.lower') }} {{ list.amount | fix2 }}</div>
              </span>
              <span v-if="list.status==3">
                <div class="f-13 ff-sbrm" :class="{'c-gray':list.earning==0,'c-orange':list.earning > 0}">
                  <span v-if="list.earning > 0">+</span>
                  {{ list.earning | fix2 }}
                </div>
                <div
                  class="c-btn-green"
                  v-if="list.tradeType==0"
                >{{$t('minoption.higher')}} {{ list.amount | fix2 }}</div>
                <div class="c-red" v-else>{{ $t('minoption.lower') }} {{ list.amount | fix2 }}</div>
              </span>
            </el-col>
          </el-row>
        </li>
      </ul>
      <div class="pageination">
        <el-pagination
          small
          :pager-count="5"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="90%">
      <div class="fb f-16">{{ $t('minoption.trade_result') }}</div>
      <!-- 交易结果进度条 -->
      <div class="p-10" v-if="settlementload">
      <!-- <div class="p-10" v-if="true"> -->
        <div class="loading-pro"></div>
      </div>
      <div class="mt-20 f-11 t-c" v-else>
        <!-- <div>{{ $t('minoption.profit') }}</div> -->
        <div class="type-tip-show">
          <!-- <span v-if="btcSetPrice>0">RWD數字積分</span>
          <span v-if="ethSetPrice>0">RWT數字代幣</span> -->
          <span v-if="jysymbol == 4">RWT數字代幣</span>
          <span v-if="jysymbol == 5">RWD數字積分</span>
        </div>
        <!-- <countTo
          :startVal="0"
          :endVal="profitAmount"
          :decimals="2"
          :duration="1000"
          separator
          class="profit-amount"
          :class="{'c-red':profitAmount>0,'c-green':profitAmount<0}"
        ></countTo> -->
        <countTo
          :startVal="0"
          :endVal="profitAmount"
          :decimals="2"
          :duration="1000"
          separator
          class="profit-amount"
          :class="{'c-orange':profitAmount>0,'c-gray':profitAmount<0}"
        ></countTo>
        <div class="set-price-pop">
          <!-- <span v-if="btcSetPrice>0">RWD/USDT {{ btcSetPrice | fix4 }}</span>
          <span class="ml-10" v-if="ethSetPrice>0">RWT/USDT {{ ethSetPrice | fix4 }}</span> -->
          <span v-if="btcSetPrice>0">BTC/USDT {{ btcSetPrice | fix4 }}</span>
          <span class="ml-10" v-if="ethSetPrice>0">BTC/USDT {{ ethSetPrice | fix4 }}</span>
        </div>
        <ul class="order-pop-list">
          <li v-for="(list,index) in orderList" :key="index">
            <el-row>
              <el-col :span="6">
                <div class="f-13 ff-sbrm t-l c-gray type-tip-main">
                  <!-- <span v-if="list.trade_pair==1">RWD/USDT</span>
                  <span v-if="list.trade_pair==2">RWT/USDT</span> -->
                  <span>BTC/USDT</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="f-13 ff-sbrm t-l c-gray">{{ list.commit_index_price | fix4}}</div>
              </el-col>
              <el-col :span="7" class="t-l">
                <div :class="{'c-btn-green':list.trade_type==0,'c-btn-red':list.trade_type==-1}">
                  <span v-if="list.trade_type==0">{{ $t('minoption.higher') }}</span>
                  <span v-else>{{ $t('minoption.lower') }}</span>
                  {{ list.investment_amount | fix2 }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="f-13 ff-sbrm t-r c-orange" v-if="list.final_return - list.investment_amount>0">
                  <span v-if="list.final_return - list.investment_amount>0">+</span>
                  <span>{{(list.final_return - list.investment_amount) | fix2 }}</span>
                </div>
                <div class="f-13 ff-sbrm t-r c-gray" v-if="list.final_return - list.investment_amount<0">
                  <span v-if="list.final_return - list.investment_amount>0">+</span>
                  <span>{{(list.final_return - list.investment_amount) | fix2 }}</span>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
        <!-- 分享按钮 -->
        <!-- <div class="share-pop-links">
          <nuxt-link
            :to="{name:'share',params:{earning:profitAmount,settlement:btcSetPrice||ethSetPrice,inviteCode:inviteCode}}"
          >{{$t('minoption.share_link')}}</nuxt-link>
        </div> -->
      </div>
    </el-dialog>
    <!-- <div class="jj-pop" v-show="showActive">
      <div class="jj-content">
        <i class="el-icon-close" @click="closeActiveTips()"></i>
        <img :src="($i18n.locale=='en')?'/img/pop_en.png':'/img/pop_cn.png'" />
        <nuxt-link class="go-active" :to="{name:'active',params:{}}">&nbsp;</nuxt-link>
      </div>
    </div>-->
    
  </el-container>
</template>
<style>
.islogin-bg{
  position:fixed;
  left:0;
  top:0;
  right:0;
  bottom: 0;
  z-index:99;
}
.verfied-type {
  margin-left: 0;
}
.menu-box li .icon-news::after{
  width:17px;
  height:17px;
  top: 16px;
  left: 30px;
  background-image:url(/img/icon_news.png);
}
@media screen and (min-width: 359px) {
  .total-price-pool .total-price-pool-type {
    font-size: 14px;
  }
}
@media screen and (max-width: 359px) {
  .value {
    right: 10px;
    left: initial;
  }
  .line1 {
    width: calc(100vw - 129px);
    right: 129px;
    left: initial;
  }
}
.time-line {
  height: calc(100% - 100px);
  top: 0;
}
.heartNum{
  background-color:transparent;
}
/* .high-chart > .chart-box {
  height: calc(100% - 128px);
} */
.exchange-pop,
.my-wallet {
  top: 100px;
}
.exchange-pop {
  z-index: 99999;
}
html .el-input-number__decrease,
html .el-input-number__increase {
  height: 48px;
  /* line-height: 48px; */
  padding:17px 0;
  line-height:14px;
}
.trade .el-input-number {
  height: 48px;
  overflow: hidden;
}
html .el-input-number .el-input__inner{
  padding:17px 0;
}
html .el-input__inner {
  height: 48px;
  /* line-height: 48px; */
  line-height:14px;
}
.now-value {
  display: none;
}
.block-down,
.block-up {
  height: 48px;
  padding: 15px 0;
  border-radius: 3px;
  line-height: 18px;
}
.block-up {
  background: linear-gradient(
    135deg,
    rgba(126, 211, 33, 0.3) 0%,
    rgba(126, 211, 33, 0) 100%
  );
  border: 1px solid rgba(137, 234, 30, 1);
}
.block-down {
  background: linear-gradient(
    135deg,
    rgba(255, 92, 0, 0.3) 0%,
    rgba(255, 122, 0, 0.1) 100%
  );
  border: 1px solid rgba(255, 102, 0, 1);
}
.block-up span {
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(137, 234, 30, 1);
  text-shadow: 0px 0px 20px rgba(1, 238, 234, 0.6);
}
.block-down span {
  color: rgba(255, 102, 0, 1);
}
.block-up .figure {
  border-color: #89EA1E;
}
.block-down .figure {
  border-color: #FF6600;
}
.el-icon-arrow-down-second.active {
  transform: rotate(225deg);
}
.icon-coin {
  width: 13px;
  height: 18px;
}
.icon-coin:after {
  top: -1px;
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
}
.trade-block {
  margin-bottom: 8px;
}
.menu-account {
  padding: 20px 0;
}
@media screen and (max-width: 359px){
  .menu-box li .icon-news::after {
      left: 22px;
  }
}
</style>
<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { formatDate } from "../static/date.js";
import countTo from "vue-count-to";
import axios from "axios";
const Cookie = process.client ? require("js-cookie") : undefined;
import $ from 'jquery';

// 导入chart组件
var myvue = {};
import XChart from "../components/charts";
export default {
  // middleware: "authenticated",
  asyncData({ app, store, params }) {
    store.commit("setLastpage", "/minoption");
    let auth = store.state.auth ? store.state.auth : "";
    let { res } = axios.post(
        `${process.env.BASE_URL}/user-api/user-info/account/detail`,
        {
          userId: "[user_id]"
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: store.state.auth
          }
        }
    );
    return {
      auth: store.state.auth,
      lang: store.state.locale,
      user_id:0,
    };
  },
  data() {
    let isShowTradePopData = localStorage.getItem("tradePopShows");
    return {
      isLoginFlag:false,
      heartNum: 0,
      needLogin: "hasLogin",
      showDownTips: false,
      showAddTipsBg: false,
      showWallet: false,
      showMenu: false,
      showExchange: false,
      showActive: false,
      showlang: false,
      accountName: "",
      avatar_tx: "",
      inviteCode: "",
      option: {},
      chartId: "id1",
      needRedraw: 0,
      chartType: 1,
      nowAccountType: 4,
      chartLen: 24,
      lastDataTime: 0,
      account: 0,
      virtualAccount: 0,
      practice: 0,
      showChart: {
        btc: true,
        eth: false
      },
      intervals: 120000,
      newdata: {
        id: null
      },
      nowVal: 9980,
      stompClient: "",
      timer: "",
      localTimer: "",
      showHistory: false,
      lastType: 1,
      historyType: 1,
      historyPageNum: 1,
      historyPageSize: 8,
      historyList: [],
      orderList: [],
      total: 1,
      dialogVisible: false,
      userId: "",
      profitAmount: 0,
      btcSetPrice: 0,
      ethSetPrice: 0,
      premhash: "",
      nowmhash: "",
      settlementload: false,
      timeMin: 0,
      lang: "",
      wsIsUse: false,
      kycStateUrl: "/kyc",
      kycState: 1,
      isShowTradePop: isShowTradePopData != 2 ? true : false,
      jfSelected:false,//积分未领取
      trade_pair:"",
      jysymbol:""//交易结果显示的币种
    };
  },
  beforeCreate() {
    myvue = this;
  },
  mounted: function() {
    let that = this;
    //判断是否领取过积分
    this.jfSelected = Cookie.get("jfSelected") ? true : false;
    //設置字體為繁體
    let command = "tr";
    localStorage.setItem("lang", command);
    this.$i18n.locale = command;
    Cookie.set("lang", command);
    this.$store.commit("setLang", command);
    // this.getUserInfo();
    let ua = navigator.userAgent.toLocaleLowerCase();
    let isIOS = ua.indexOf("iphone") > -1;
    let hadShowAdd = localStorage.getItem("add_desktop");
    if (isIOS && !hadShowAdd) {
      this.showDownTips = true;
    }
    let isShowActive = localStorage.getItem("active_showed");
    localStorage.setItem("lastPage", "/minoption");
    if (isShowActive) {
      this.showActive = false;
    } else {
      this.showActive = true;
    }
    that.getAccount(true);
    that.initPage();
    that.accountName = localStorage.getItem("accountName");
    let accountType = localStorage.getItem("accountType");
    if (accountType && accountType != 3) {
      // that.chooseAccount(accountType);
      that.chooseAccount(1);
    }
    if (that.auth) {
      let avatarId = localStorage.getItem("avatar");
      let inviteCode = localStorage.getItem("inviteCode");
      if (!avatarId) {
        let userInfo = that.axios.post(
          `${process.env.BASE_URL}/user-api/user-info/account/detail`,
          {
            userId: "[user_id]"
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: that.auth
            }
          }
        );
        userInfo.then(res => {
          localStorage.setItem("avatar", res.data.data.avatar);
          localStorage.setItem("inviteCode", res.data.data.inviteCode);
          avatarId = res.data.data.avatar;
        });
      } else {
        that.avatar_tx = "/tx/tx" + avatarId + ".jpg";
        that.inviteCode = inviteCode;
      }
      let userkyccheck = that.axios.post(
        `${process.env.BASE_URL}/user-api/user-kyc/check`,
        {
          userId: "[user_id]"
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      userkyccheck.then(res => {
        if (res.data.success && res.data.data) {
          that.kycState = res.data.data.state;
          if (that.kycState == 2) {
            that.kycStateUrl = "#";
          }
        }
      });
    }
    // 检测心跳
    that.localTimer = setInterval(() => {
      let nowTime = new Date().getTime();
      if (that.lastDataTime > 0) {
        if (nowTime - that.lastDataTime > 60000) {
          that.lastDataTime = nowTime;
          that.newdata = {};
          that.disconnect();
          that.initPage();
        }
      }
      let heart = that.axios(`${process.env.market}/market-websocket`);
      heart.then(res => {
        if (res.status == 200) {
          let getTime = new Date().getTime();
          that.heartNum = getTime - nowTime;
        }
      });
    }, 1000);
    //点击切换账号,下邊輸入框字體也一起動
    $(".account-box ul li").click(function(){
      // ruiying.callBackMethod()//这个ruiying是安卓端传给网页端的
      if(that.nowAccountType == 4){
        $(".el-input__inner").addClass("accout-selected");
        $(".el-input-number__decrease").addClass("accout-selected");
        $(".el-input-number__increase").addClass("accout-selected");
      }else{
        $(".el-input__inner").removeClass("accout-selected");
        $(".el-input-number__decrease").removeClass("accout-selected");
        $(".el-input-number__increase").removeClass("accout-selected");
      }
    })
    
  },
  methods: {
    isLoginFuc(){
      let that = this;
      //点击却换账号的时候，去判断token是否过期，是登录过
      if(that.isLoginFlag){
        that.$message.error(that.$t("minoption.no_login"));
        setTimeout(() => {
          that.logout("/login");
        }, 2000);
      }
    },
    initPage() {
      // this.disconnect();
      let that = this;
      that.chooseAccount(5);
      that.wsIsUse = false;
      that.needRedraw++;
      that.connection();
      let chartName = that.chartType == 1 ? "BTCUSDT" : "ETHUSDT";
      let getDateTimer = setInterval(function() {
        if (that.wsIsUse) {
          that.addData(chartName);
          let data = that.getData(
            `${
              process.env.BASE_URL
            }/history-api/history/index/${chartName}/5m/3000`
          );
          data.then(function(response) {
            if (response.success) {
              let newData = that.resetData(response.data);
              myvue.option = that.getOption(newData);
            } else {
              that.$message.error(that.$t("error.errorNet"));
              return "";
            }
          });
          clearInterval(getDateTimer);
        }
      }, 1000);
    },
    // 切换语言
    // handleCommand(command) {
    //   // let command = "tr";
    //   localStorage.setItem("lang", command);
    //   this.$i18n.locale = command;
    //   Cookie.set("lang", command);
    //   this.$store.commit("setLang", command);
    // },
    resetData(data) {
      if (!data) {
        return false;
      }
      let that = this;
      let newData = [];
      let nowLen = data.length;
      let lastTime = data[nowLen - 1].eventTime;
      that.timeMin = data[0].eventTime * 1000;
      for (let i = 0; i < data.length; i++) {
        newData[i] = [data[i].eventTime * 1000, data[i].price];
      }
      for (let i = 0; i < 70; i++) {
        newData[nowLen + i] = [(lastTime + i) * 1000, null];
      }
      return newData;
    },
    getOption(datas) {
      let that = this;
      let nowOption = {
        chart: {
          backgroundColor: null,
          spacingLeft: 0,
          spacingRight: 0,
          marginRight: 0,
          height: null,
          plotBorderWidth: 0,
          panning: true,
          pinchType: "x"
        },
        credits: {
          enabled: false
        },
        navigation: {
          buttonOptions: {
            enabled: false
          }
        },
        rangeSelector: {
          enabled: false
        },
        title: {
          text: ""
        },
        scrollbar: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          followTouchMove: false
        },
        xAxis: {
          showEmpty: true,
          type: "datetime",
          events: {
            afterSetExtremes: function(event) {
              // console.log(event.max);
            }
          },
          labels: {
            style: {
              // color: "#404c60"
              color: 'rgba(101,101,101,1);',
						  fontSize:'12px'
            }
          },
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%Y-%m",
            year: "%Y"
          },
          plotLines: [],
          min: that.timeMin,
          minRange: 33000,
          maxPadding: 0,
          tickLength: 0,
          tickColor: "#505E72",
          minorTickInterval: "auto",
          startOnTick: false,
          endOnTick: false,
          id: "test1",
          endOnTick: true,
          gridLineWidth: 1,
          tickPixelInterval: 100,
          gridLineColor: "#1A2331",
          lineColor: "#1A2331",
          minorGridLineColor: "#F0F0F0",
          minorTickInterval: "auto",
          minorGridLineWidth: 0,
          lineWidth: 1
        },
        yAxis: [
          {
            title: {
              text: ""
            },
            opposite: false,
            labels: {
              format: "{value:.2f}",
              formatter: function() {
                return this.value;
              },
              align: "left",
              x: 10,
              style: {
                // color: "#404c60"
                color: 'rgba(101,101,101,1);',
						    fontSize:'12px'
              }
            },
            endOnTick: false,
            maxPadding: 0.2,
            startOnTick: false,
            minPadding: 0.2,
            minRange: that.chartType == 1 ? 1 : 0.5,
            resize: {
              enabled: true
            },
            gridLineWidth: 1,
            gridLineColor: "#1A2331",
            lineColor: "#1A2331",
            minorGridLineColor: "#F0F0F0",
            minorTickInterval: "auto",
            minorGridLineWidth: 0,
            lineWidth: 1
          }
        ],
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            allowPointSelect: true,
            enableMouseTracking: true,
            marker: {
              radius: 1
            },
            cropThreshold: 100,
            color: "#efd535",
            dashStyle: "solid",
            lineColor: "#efd535",
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [
          {
            type: "area",
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "rgba(240, 215, 55, 0.3)"], // start
                [1, "rgba(240, 215, 55, 0.1)"] // end
              ]
            },
            name: "",
            marker: {
              enabled: false
            },
            data: datas
          }
        ]
      };
      return nowOption;
    },
    changeLoginStatus(code) {
      let that = this;
      if (code == "logout") {
        that.logout();
      }
    },
    logout(url) {
      this.clearLoginInfo();
      if (url) {
        this.$router.push(url);
      } else {
        this.$router.push("/login");
      }
    },
    clearLoginInfo() {
      Cookie.remove("auth");
      Cookie.remove("jfSelected");
      this.$store.commit("setAuth", null);
      localStorage.removeItem("auth");
      localStorage.removeItem("accountName");
    },
    change(type) {
      this.showExchange = false;
      if (
        (type == "btc" && this.chartType == 1) ||
        (type == "eth" && this.chartType == 2)
      ) {
        return false;
      }
      this.chartType = type == "btc" ? 1 : 2;
      this.needRedraw++;
      this.newdata = {};
      this.disconnect();
      this.initPage();
    },
    chooseAccount(type) {
      if (type != 4 && type != 5) {
        return false;
      }
      let that = this;
      that.showWallet = false;
      that.nowAccountType = Number(type);
      localStorage.setItem("accountType", that.nowAccountType);
      localStorage.setItem(
        "account",
        type == 4 ? that.practice : that.virtualAccount
      );
     
    },
    async getData(url) {
      let that = this;
      let { data } = await this.axios(url, {
        headers: {
          "Content-Type": "application/json",
          token: that.auth
        }
      });
      if (typeof data === "string") {
        // 返回的是jsonp类型的数据，所以要用正则表达式来匹配截取json数据
        data = JSON.parse(data.replace("?(", "").replace(")", ""));
      }
      return data;
    },
    closePop() {
      this.showMenu = false;
      this.showHistory = false;
    },
    hadShowedAdd() {
      localStorage.setItem("add_desktop", 1);
    },
    closeActiveTips() {
      this.showActive = false;
      localStorage.setItem("active_showed", 1);
    },
    showAddTips() {
      this.showAddTipsBg = true;
      this.hadShowedAdd();
    },
    closeAddTips() {
      this.showAddTipsBg = false;
      this.showDownTips = false;
      this.hadShowedAdd();
    },
    addData(name) {
      let that = this;
      if (!that.stompClient) {
        return false;
      }
      that.stompClient.subscribe(
        `/market/crypto/spot/${name}/kline/latest`,
        msg => {
          let datas = JSON.parse(msg.body);
          if (datas) {
            let nowTime = datas.epochSecond * 1000;
            if (that.lastDataTime == nowTime) {
              // console.log("重复数据" + nowTime);
            } else {
              that.lastDataTime = nowTime;
              if (!that.nowmhash) {
                that.nowmhash = datas.mhash;
                that.premhash = datas.mhash;
              }
              if (that.nowmhash != datas.mhash) {
                that.premhash = that.nowmhash;
              }
              that.nowmhash = datas.mhash;
              // console.log(datas.shash,'datas.shash');
              // console.log(datas.mhash,'datas.mhash');
              that.newdata = {
                id: "t" + nowTime,
                type: that.chartType,
                shash: datas.shash,
                mhash: datas.mhash,
                data: [nowTime, datas.price]
              };
            }
          }
        },
        {
          "accept-version": "1.1.1",
          "heart-beat": 1000
        }
      );
    },
    connection() {
      let that = this;
      // 建立连接对象
      let socket = new SockJS(`${process.env.market}/market-websocket`);
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {
          "accept-version": "1.1.1",
          "heart-beat": Math.random() * 1000000
        },
        function() {
          that.wsIsUse = true;
        }
      );
      this.stompClient.debug = null;
      // 断开重连机制, 尝试发送消息, 捕获异常发生时重连;
      that.timer = setInterval(() => {
        try {
          that.stompClient.send("heart");
          that.wsIsUse = true;
        } catch (err) {
          console.log("断线了，重连中...");
          that.connection();
        }
      }, 10000);
    },
    //连接后台
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
        this.stompClient = "";
      } else {
        return "";
      }
    },
    getAccount(isAll) {
      let that = this;
      let rwt = that.getData(
        `${process.env.BASE_URL}/wallet-api/wallet/balance/[user_id]/4`
      );
      rwt.then(function(response) {
        if (response) {
          if (response.success) {
            that.practice = response.data.available;
            that.user_id = response.data.userId;
            localStorage.setItem("user_id",response.data.userId);
            if (that.nowAccountType == 4) {
              that.account = that.practice;
            }
            localStorage.setItem("account", that.account);
          } else {
            if (response.error.code == "GATEWAY_AUTH_004") {
              // that.clearLoginInfo();
              // that.$message.error(that.$t("minoption.no_login"));
              // that.logout("login");
              that.isLoginFlag = true;
              console.log("isLoginFlag:",that.isLoginFlag);
            }
          }
        } else {
          return "";
        }
      });
      let rwd = that.getData(
        `${
          process.env.BASE_URL
        }/wallet-api/wallet/balance/[user_id]/5`
      );
      rwd.then(function(response) {
        if (response) {
          if (response.success) {
            that.virtualAccount = response.data.available;
            if (that.nowAccountType == 5) {
              that.account = that.virtualAccount;
            }
            localStorage.setItem("account", that.account);
          }
        } else {
          return "";
        }
      });
    },
    handleType(command) {
      this.historyType = command;
      this.getHistory(1);
    },
    getHistory(type) {
      let that = this;
      if (!that.auth) {
        that.logout("/login");
      }
      if (type == 1) {
        this.showHistory = true;
      }
      let historyTypeName = that.nowAccountType == 5 ? "/v" : "/r";
      //1212 edit
      // let historyTypeName = "/r";
      let history = that.axios(
        `${
          process.env.BASE_URL
        }/history-api/history/option${historyTypeName}/[user_id]/${
          that.historyType
        }/${that.historyPageNum}/${that.historyPageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      history.then(function(response) {
        if (response) {
          if (response.data.success) {
            let datas = response.data.data;
            that.total = response.data.page.totalElements;
            let newHistory = [];
            for (let i = 0; i < datas.length; i++) {
              newHistory[i] = {};
              (newHistory[i].id = Math.round(Math.random() * 10000000)),
                (newHistory[i].tradeType = datas[i].tradeType);
              newHistory[i].status = datas[i].status;
              newHistory[i].amount = datas[i].amount;
              newHistory[i].commit_index_price = datas[i].commit_index_price;
              newHistory[i].commitIndexPrice = datas[i].commitIndexPrice;
              newHistory[i].expected_return = datas[i].expected_return;
              newHistory[i].settledIndexPrice = datas[i].settledIndexPrice;
              newHistory[i].earning = datas[i].earning;
              newHistory[i].createdAt = datas[i].createdAt;
              newHistory[i].odds = datas[i].odds;
            }
            that.historyList = newHistory;
          } else {
            if (response.data.error.code == "GATEWAY_AUTH_004") {
              that.logout();
            }
          }
        } else {
          that.$message.error(that.$t("error.errorNet"));
        }
      });
    },
    // 更新账户
    winAccount(amount) {
      this.getAccount();
      this.getHistory(0);
    },
    // 结算逻辑
    settlementDetail() {
      if(!this.isShowTradePop){
        this.getAccount();
        return false;
      }
      let that = this;
      that.dialogVisible = true;
      that.settlementload = true;
      let accountTypeName = that.nowAccountType == 5 ? "/virtual" : "";
      setTimeout(function() {
        let details = that.axios(
          `${process.env.BASE_URL}/order-api/options-order/user-settlement-detail/${that.premhash}/[user_id]`,
          {
            headers: {
              "Content-Type": "application/json",
              token: that.auth
            }
          }
        );
        details
          .then(res => {
            that.settlementload = false;
            if (res.data.success && res.data.data) {
              that.btcSetPrice = res.data.data.btc_index;
              that.ethSetPrice = res.data.data.eth_index;
              let setDetails = res.data.data.base_user_settlement_detail;
              let orderLists = [];
              let amounts = 0;
              for (let i = 0; i < setDetails.length; i++) {
                amounts += Number(setDetails[i].amount);
                orderLists = [
                  ...orderLists,
                  ...setDetails[i].settlemented_order
                ];
              }
              that.profitAmount = amounts;
              that.orderList = orderLists;
              //console.log(that.orderList,"that.orderList");
              that.trade_pair = orderLists[0].trade_pair
              //to do
              that.jysymbol = orderLists[0].symbol;
              console.log("symbol:",orderLists[0].symbol);
              //console.log(that.trade_pair,"trade_pair");
              that.getAccount();
            } else {
              that.dialogVisible = false;
              that.$message.error(that.$t("error.settlementError"));
            }
          })
          .catch(e => {
            that.dialogVisible = false;
            that.$message.error(that.$t("error.errorNet"));
          });
      }, 3000);
      
    },
    jfSelectedFuc(){
      let expires = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
      let that = this;
      if (!that.auth) {
        let accountName = localStorage.getItem("accountName");
        if(accountName){
          that.logout("/login");
        }else{
          that.logout("/register");
        }
        return false;
      }
      let jf = that.axios.post(
        `${process.env.BASE_URL}/verify-api/adminTrack/createRwd`,
        {
          userId: "[user_id]"
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      jf.then(res => {
        if(res.data.success == true){
          that.getAccount(0);
          console.log(1);
          that.$message.success("用户rwd积分领取成功");
        } else {
          console.log(2);
          that.$message.error(res.data.error.message);
        }
        that.jfSelected = true;
        Cookie.set("jfSelected",true,expires)
      });
    },
    resetAccount() {
      let expires = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
      let that = this;
      if (!that.auth) {
        that.logout("/register");
        return false;
      }
      let reset = that.axios.post(
        `${process.env.BASE_URL}/wallet-api/wallet/virtual/init-wallet/`,
        {
          user_id: "[user_id]",
          symbol: 5
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: that.auth
          }
        }
      );
      reset.then(res => {
        if (res.status == 200) {
          if (res.data.success) {
            that.getAccount();
          } else {
            let errorCode = res.data.code ? res.data.code : res.data.error.code;
            if (
              errorCode == "GATEWAY_AUTH_004" ||
              errorCode == "GATEWAY_AUTH_003"
            ) {
              that.logout();
            } else {
              that.$message.error(that.$t("systemError." + errorCode));
            }
          }
        } else {
          console.log(response);
        }
      });
    },
    showWalletbtn() {
      this.showWallet = !this.showWallet;
      this.getAccount(1);
    },
    handleCurrentChange(val) {
      this.historyPageNum = val;
      this.getHistory();
    },
  },
  beforeDestroy: function() {
    // 页面离开时断开连接,清除定时器
    this.newdata = {};
    this.disconnect();
    clearInterval(this.timer);
  },
  activated() {},
  components: {
    XChart,
    countTo
  },
  filters: {
    formatMS(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    formatMD(time) {
      var date = new Date(time);
      return formatDate(date, "MM-dd");
    },
    addZero: function(data) {
      return Number(data).toFixed(8);
    },
    fix2: function(data) {
      return Number(data).toFixed(2);
    },
    fix4: function(data) {
      return Number(data).toFixed(4);
    },
    showUserId: function(userId){
      return 10000000 + parseInt(userId);
    },
  }
};
</script>