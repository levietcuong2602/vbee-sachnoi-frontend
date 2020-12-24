<template>
  <div id="payment" v-bind:class="['components-container', 'components-container-mb']">
    <div class="content-package" style="width: 100%">
      <div class="el-col-lg-16 el-col-md-16 el-col-sm-24 el-col-xs-24 box-cart-info-left">
        <h3>Thanh toán đơn hàng</h3>
        <div class="box-step-1">
          <div class="cart-info">
            <div class="box-title-cart-info">
              <div :class="titleCartInfoClass">
                <h2>1</h2>
                <b>Thông tin giỏ hàng</b>
              </div>
              <svg
                width="250"
                height="50"
                viewBox="0 0 250 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z"
                  :fill="fillSvgBuy"
                />
              </svg>
            </div>
            <div class="box-change-cart-info">
              <p class="box-change-p hidden-xs-only">Quý khách vui lòng chọn gói cước</p>
              <p class="text-change" v-show="currentStep !== 1" @click="onGotoStep(1)">
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div class="content-step content-step-1" v-show="currentStep === 1">
            <table class="table table-bordered info-detail">
              <tr>
                <td>
                  <span>Tên gói</span>
                </td>
                <td>
                  <span>Thời gian xử lý</span>
                </td>
                <td>Hạn sử dụng (ngày)</td>
                <td>
                  <span>Số lượng (gói)</span>
                </td>
                <td>Giá cước (VNĐ)</td>
              </tr>
              <tr>
                <td class="select-font-bold">
                  <el-select
                    placeholder="Chọn gói cước"
                    v-model="currentPackage.packageName"
                    @change="handleChangePackage"
                  >
                    <el-option
                      v-for="item in listPackages"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </td>
                <td class="select-font-bold">
                  <el-select
                    placeholder="Thời gian xử lý"
                    v-model="currentPackage.processingTime"
                    @change="handleChangeProcessTime"
                  >
                    <el-option
                      v-for="item in packageGroup.processingTime"
                      :key="item"
                      :label="convertTimeToString(item)"
                      :value="item"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <b
                    style="font-size: 16px"
                  >{{ currentPackage.numberExpireDay ? currentPackage.numberExpireDay + ' ngày' : 'không xác định' }}</b>
                </td>
                <td class="select-font-bold">
                  <b
                    style="font-size: 16px"
                  >{{ currentPackage.packageName ? '1 gói' : 'không xác định' }}</b>
                </td>
                <td>
                  <b
                    style="font-size: 16px"
                  >{{ currentPackage.amount ? formatNumber(currentPackage.amount) + ' VNĐ' : 'không xác định' }}</b>
                </td>
              </tr>
            </table>
            <i
              class="text-center"
              style="color: red"
              v-show="error.errorStep1"
            >{{ error.messageErrorStep1 }}</i>
            <div class="proceed-payment">
              <el-button :class="btnProceedPaymentClass" @click="gotoStep2" round>
                Tiến hành thanh toán
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M6.43366 9.34392L11.8203 3.95732C12.0599 3.71762 12.0599 3.32915 11.8203 3.08958L11.3865 2.65572C11.1468 2.41619 10.7582 2.41619 10.5188 2.65572L5.99993 7.17444L1.48165 2.65572C1.24184 2.41619 0.852978 2.41619 0.613678 2.65572L0.179828 3.08957C-0.0599804 3.32915 -0.0599804 3.71762 0.179828 3.95731L5.56655 9.34392C5.80601 9.58369 6.19413 9.58369 6.43366 9.34392Z"
                      :fill="fillSvgAct"
                    />
                  </g>
                  <g clip-path="url(#clip1)">
                    <path
                      d="M6.43366 15.3439L11.8203 9.95732C12.0599 9.71762 12.0599 9.32915 11.8203 9.08958L11.3865 8.65572C11.1468 8.41619 10.7582 8.41619 10.5188 8.65572L5.99993 13.1744L1.48165 8.65572C1.24184 8.41619 0.852978 8.41619 0.613678 8.65572L0.179828 9.08957C-0.0599804 9.32915 -0.0599804 9.71762 0.179828 9.95731L5.56655 15.3439C5.80601 15.5837 6.19413 15.5837 6.43366 15.3439Z"
                      :fill="fillSvgAct"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(12) rotate(90)"
                      />
                    </clipPath>
                    <clipPath id="clip1">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(12 6) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </el-button>
            </div>
          </div>
        </div>
        <div class="box-step-2">
          <div class="cart-info">
            <div class="box-title-cart-info">
              <div :class="titleCartInfoClass">
                <h2>2</h2>
                <b>Thông tin khách hàng</b>
              </div>
              <svg
                width="250"
                height="50"
                viewBox="0 0 250 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z"
                  :fill="fillSvgBuy"
                />
              </svg>
            </div>
            <div class="box-change-cart-info">
              <p
                class="box-change-p hidden-xs-only"
              >Quý khách vui lòng cung cấp thông tin khách hàng</p>
              <p class="text-change" v-show="currentStep !== 2" @click="onGotoStep(2)">
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div class="content-step content-step-2" v-show="currentStep === 2">
            <div class="row info-customer method-login">
              <div class="title-method col-sm-3 col-5">
                <p>Phương thức đăng ký</p>
              </div>
              <div class="content-method col-sm-9 col-7">
                <b>Cá nhân</b>
              </div>
            </div>
            <div class="row info-customer">
              <div class="title col-sm-3 col-5">
                <p>Họ tên</p>
              </div>
              <div class="col-sm-9 col-7 input-info-customer">
                <input class="form-control" placeholder="Nhập họ và tên" v-model="orders.fullName" />
              </div>
            </div>
            <div class="row info-customer">
              <div class="title col-sm-3 col-5">
                <p>
                  Điện thoại
                  <span style="color: #FF0000">(*)</span>
                </p>
              </div>
              <div class="col-sm-9 col-7 input-info-customer">
                <input
                  class="form-control"
                  placeholder="Số điện thoại"
                  v-model="orders.phoneNumber"
                  @keyup="handleCheckPhone"
                  @blur="handleCheckPhone"
                />
                <i class="has-danger" v-show="error.errorPhoneNumber">{{ error.messageErrorPhone }}</i>
              </div>
            </div>
            <div class="row info-customer">
              <div class="title col-sm-3 col-5">
                <p>Email</p>
              </div>
              <div class="col-sm-9 col-7 input-info-customer">
                <input
                  class="form-control"
                  v-model="orders.email"
                  placeholder="Nhập email của bạn"
                  @blur="handleCheckEmail"
                />
                <p class="has-danger" v-show="error.errorEmail">{{ error.messageErrorEmail }}</p>
              </div>
            </div>
            <div class="row info-customer">
              <div class="title col-sm-3 col-5">
                <p>Tỉnh thành</p>
              </div>
              <div class="col-sm-9 col-7 input-info-customer">
                <el-select placeholder="Select" v-model="orders.city">
                  <el-option :value="null">--Chọn thành phố--</el-option>
                  <el-option
                    v-for="item in listCitys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="row info-customer">
              <div class="title col-sm-3 col-5">
                <p>Ghi chú bổ sung</p>
              </div>
              <div class="col-sm-9 col-7 input-info-customer">
                <textarea class="form-control" v-model="orders.note"></textarea>
              </div>
            </div>
            <div
              class="row info-customer"
              style="display: flex; justify-content: flex-end; align-items: center"
            >
              <div class="col-sm-9 col-xs-12 input-info-customer" v-show="false">
                <el-switch></el-switch>
                <label style="margin-bottom: 0">Xuất hóa đơn công ty</label>
              </div>
            </div>

            <!-- dành cho tài khoản doanh nghiệp -->
            <!-- <div v-show="orders.is_company">
              <div class="row info-customer">
                <div class="title col-sm-3 col-xs-12">
                  <p>
                    Tên công ty
                    <span style="color: #FF0000">(*)</span>
                  </p>
                </div>
                <div class="col-sm-9 col-xs-12 input-info-customer">
                  <input
                    v-model="orders.company_name"
                    type="text"
                    class="form-control"
                    @keyup="handleCheckInputNameCompany"
                  />
                  <p class="has-danger" v-show="error_nameCompany">{{text_error_nameCompany}}</p>
                </div>
              </div>
              <div class="row info-customer">
                <div class="title col-sm-3 col-xs-12">
                  <p>
                    Địa chỉ công ty
                    <span style="color: #FF0000">(*)</span>
                  </p>
                </div>
                <div class="col-sm-9 col-xs-12 input-info-customer">
                  <input
                    v-model="orders.company_address"
                    type="text"
                    class="form-control"
                    @keyup="handleCheckInputAdrCompany"
                  />
                  <p class="has-danger" v-show="error_addCompany">{{text_error_addCompany}}</p>
                </div>
              </div>
              <div class="row info-customer">
                <div class="title col-sm-3 col-xs-12">
                  <p>
                    Mã số thuế
                    <span style="color: #FF0000">(*)</span>
                  </p>
                </div>
                <div class="col-sm-9 col-xs-12 input-info-customer">
                  <input
                    v-model="orders.company_tax"
                    type="text"
                    class="form-control"
                    @keyup="handleCheckInputTaxCode"
                  />
                  <p class="has-danger" v-show="error_taxCode">{{text_error_taxCode}}</p>
                </div>
              </div>
            </div>-->
            <div class="proceed-payment">
              <el-button :class="btnProceedPaymentClass" @click="gotoStep3" round>
                Tiến hành thanh toán
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M6.43366 9.34392L11.8203 3.95732C12.0599 3.71762 12.0599 3.32915 11.8203 3.08958L11.3865 2.65572C11.1468 2.41619 10.7582 2.41619 10.5188 2.65572L5.99993 7.17444L1.48165 2.65572C1.24184 2.41619 0.852978 2.41619 0.613678 2.65572L0.179828 3.08957C-0.0599804 3.32915 -0.0599804 3.71762 0.179828 3.95731L5.56655 9.34392C5.80601 9.58369 6.19413 9.58369 6.43366 9.34392Z"
                      :fill="fillSvgAct"
                    />
                  </g>
                  <g clip-path="url(#clip1)">
                    <path
                      d="M6.43366 15.3439L11.8203 9.95732C12.0599 9.71762 12.0599 9.32915 11.8203 9.08958L11.3865 8.65572C11.1468 8.41619 10.7582 8.41619 10.5188 8.65572L5.99993 13.1744L1.48165 8.65572C1.24184 8.41619 0.852978 8.41619 0.613678 8.65572L0.179828 9.08957C-0.0599804 9.32915 -0.0599804 9.71762 0.179828 9.95731L5.56655 15.3439C5.80601 15.5837 6.19413 15.5837 6.43366 15.3439Z"
                      :fill="fillSvgAct"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(12) rotate(90)"
                      />
                    </clipPath>
                    <clipPath id="clip1">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(12 6) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </el-button>
            </div>
          </div>
        </div>
        <div class="box-step-3">
          <div class="cart-info">
            <div class="box-title-cart-info">
              <div :class="titleCartInfoClass">
                <h2>3</h2>
                <b>Thanh toán đơn hàng</b>
              </div>
              <svg
                width="250"
                height="50"
                viewBox="0 0 250 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0H223.813L236.907 12.5L250 25L223.211 50L0 50V0Z"
                  :fill="fillSvgBuy"
                />
              </svg>
            </div>
            <div class="box-change-cart-info">
              <p class="box-change-p hidden-xs-only">Vui lòng chọn hình thức thanh toán phù hợp</p>
            </div>
          </div>
          <div class="content-step content-step-3" v-show="currentStep === 3">
            <div style="margin: 15px 0">
              <el-radio v-model="typePayment" label="1">Thanh toán bằng thẻ ATM</el-radio>
              <el-radio v-model="typePayment" label="2">Trừ tiền điện thoại trực tiếp</el-radio>
            </div>

            <!-- <div class="bypackage-atm" v-show="typePayment === '1'">
              <el-tabs tab-position="left" v-model="tabMethodPayment">
                <div class="proceed-payment">
                  <el-button :class="btnProceedPaymentClass" @click="onSave" round>
                    Xác nhận đơn hàng
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.86785 5.56634L1.48124 0.179651C1.24155 -0.0598835 0.853074 -0.0598835 0.613501 0.179651L0.179651 0.613501C-0.0598836 0.853191 -0.0598836 1.24178 0.179651 1.48116L4.69836 6.00007L0.17965 10.5183C-0.0598841 10.7582 -0.0598842 11.147 0.17965 11.3863L0.6135 11.8202C0.853074 12.06 1.24155 12.06 1.48124 11.8202L6.86785 6.43345C7.10762 6.19399 7.10762 5.80587 6.86785 5.56634Z"
                        :fill="fillSvgAct"
                      />
                      <path
                        d="M12.8678 5.56634L7.48124 0.179651C7.24155 -0.0598835 6.85307 -0.0598835 6.6135 0.179651L6.17965 0.613501C5.94012 0.853191 5.94012 1.24178 6.17965 1.48116L10.6984 6.00007L6.17965 10.5183C5.94012 10.7582 5.94012 11.147 6.17965 11.3863L6.6135 11.8202C6.85307 12.06 7.24155 12.06 7.48124 11.8202L12.8678 6.43345C13.1076 6.19399 13.1076 5.80587 12.8678 5.56634Z"
                        :fill="fillSvgAct"
                      />
                    </svg>
                  </el-button>
                </div>
                <el-tab-pane
                  v-for="item in methodOfPayments"
                  :name="item.activeName"
                  :key="item.id"
                >
                  <div class="left-tab-panel" slot="label">
                    <img class="img-tab-panel" :src="item.icon" alt />
                    <div class="custom-hide">
                      <div v-html="item.name"></div>
                    </div>
                  </div>
                  <div>
                    <div class="more-info-head col-12">
                      <p>{{item.description}}</p>
                    </div>
                    <div class="accept_order col-12">
                      <AcceptOder :data="overView"></AcceptOder>
                    </div>
                    <div v-show="item.is_bank === 1" class="box-select-banks col-12">
                      <ListBank :banks="banks" :bank_id.sync="orders.bank_id" />
                    </div>
                    <div class="info-banks-transfer col-12">
                      <div v-html="item.content"></div>
                      <p>
                        <span style="font-weight: bold">Nội dung chuyển khoản:</span>
                        {{}}
                      </p>
                    </div>
                  </div>
                  <div class="proceed-payment">
                    <el-button :class="btnProceedPaymentClass" @click="onSave" round>
                      Xác nhận đơn hàng
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.86785 5.56634L1.48124 0.179651C1.24155 -0.0598835 0.853074 -0.0598835 0.613501 0.179651L0.179651 0.613501C-0.0598836 0.853191 -0.0598836 1.24178 0.179651 1.48116L4.69836 6.00007L0.17965 10.5183C-0.0598841 10.7582 -0.0598842 11.147 0.17965 11.3863L0.6135 11.8202C0.853074 12.06 1.24155 12.06 1.48124 11.8202L6.86785 6.43345C7.10762 6.19399 7.10762 5.80587 6.86785 5.56634Z"
                          :fill="fillSvgAct"
                        />
                        <path
                          d="M12.8678 5.56634L7.48124 0.179651C7.24155 -0.0598835 6.85307 -0.0598835 6.6135 0.179651L6.17965 0.613501C5.94012 0.853191 5.94012 1.24178 6.17965 1.48116L10.6984 6.00007L6.17965 10.5183C5.94012 10.7582 5.94012 11.147 6.17965 11.3863L6.6135 11.8202C6.85307 12.06 7.24155 12.06 7.48124 11.8202L12.8678 6.43345C13.1076 6.19399 13.1076 5.80587 12.8678 5.56634Z"
                          :fill="fillSvgAct"
                        />
                      </svg>
                    </el-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>-->
            <div class="bypackage-live" v-show="typePayment === '2'">
              <div class="box-input-phone">
                <div class="title-step-3 el-col-lg-8">
                  <p style="text-align: right">
                    Số điện thoại:
                    <span style="color: red">(*)</span>
                  </p>
                </div>
                <div class="el-col-lg-16">
                  <input
                    :class="inputClass"
                    v-model="phonePayment"
                    placeholder="Nhập số điện thoại"
                  />
                  <p
                    class="has-error"
                    v-if="error.errorPhonePayment"
                  >* {{ error.messsgeErrorPhonePayment }}</p>
                  <div v-if="!isSubMoneyPhone" class="proceed-payment">
                    <el-button
                      :class="btnProceedPaymentClass"
                      @click="onConfirmOrders"
                      round
                      :v-loading="loading"
                      :disabled="loading"
                    >
                      Xác nhận đơn hàng
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.86785 5.56634L1.48124 0.179651C1.24155 -0.0598835 0.853074 -0.0598835 0.613501 0.179651L0.179651 0.613501C-0.0598836 0.853191 -0.0598836 1.24178 0.179651 1.48116L4.69836 6.00007L0.17965 10.5183C-0.0598841 10.7582 -0.0598842 11.147 0.17965 11.3863L0.6135 11.8202C0.853074 12.06 1.24155 12.06 1.48124 11.8202L6.86785 6.43345C7.10762 6.19399 7.10762 5.80587 6.86785 5.56634Z"
                          :fill="fillSvgAct"
                        />
                        <path
                          d="M12.8678 5.56634L7.48124 0.179651C7.24155 -0.0598835 6.85307 -0.0598835 6.6135 0.179651L6.17965 0.613501C5.94012 0.853191 5.94012 1.24178 6.17965 1.48116L10.6984 6.00007L6.17965 10.5183C5.94012 10.7582 5.94012 11.147 6.17965 11.3863L6.6135 11.8202C6.85307 12.06 7.24155 12.06 7.48124 11.8202L12.8678 6.43345C13.1076 6.19399 13.1076 5.80587 12.8678 5.56634Z"
                          :fill="fillSvgAct"
                        />
                      </svg>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isSubMoneyPhone" class="box-input-otp">
              <div class="resend-otp">
                <div class="el-col-lg-16">
                  <p>Hệ thống đã gửi mã OTP đến số điện thoại trên.</p>
                  <p>
                    <el-button class="btn-resend-otp" @click="resendOTP" :disabled="isCount">Gửi lại</el-button>
                    <countdown v-if="isCount" :time="60000" @end="handleCountdownEnd">
                      <template slot-scope="props">( {{ props.totalSeconds }} s)</template>
                    </countdown>
                  </p>
                </div>
              </div>
              <div class="el-row">
                <div class="title-step-3 el-col-lg-8">
                  <p style="text-align: right">Mã OTP</p>
                </div>
                <div class="el-col-lg-16">
                  <input
                    :class="inputOTPClass"
                    :disabled="disableInputOTP"
                    v-model="otpCode"
                    autocomplete="off"
                  />
                  <p class="has-error" v-if="error.errorOTPCode">* {{ error.messageErrorOTP }}</p>
                  <div class="proceed-payment">
                    <el-button
                      :class="btnProceedPaymentClass"
                      :disabled="disableConfirmOTP"
                      round
                      :v-loading="loading"
                    >
                      Xác nhận
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.86785 5.56634L1.48124 0.179651C1.24155 -0.0598835 0.853074 -0.0598835 0.613501 0.179651L0.179651 0.613501C-0.0598836 0.853191 -0.0598836 1.24178 0.179651 1.48116L4.69836 6.00007L0.17965 10.5183C-0.0598841 10.7582 -0.0598842 11.147 0.17965 11.3863L0.6135 11.8202C0.853074 12.06 1.24155 12.06 1.48124 11.8202L6.86785 6.43345C7.10762 6.19399 7.10762 5.80587 6.86785 5.56634Z"
                          :fill="fillSvgAct"
                        />
                        <path
                          d="M12.8678 5.56634L7.48124 0.179651C7.24155 -0.0598835 6.85307 -0.0598835 6.6135 0.179651L6.17965 0.613501C5.94012 0.853191 5.94012 1.24178 6.17965 1.48116L10.6984 6.00007L6.17965 10.5183C5.94012 10.7582 5.94012 11.147 6.17965 11.3863L6.6135 11.8202C6.85307 12.06 7.24155 12.06 7.48124 11.8202L12.8678 6.43345C13.1076 6.19399 13.1076 5.80587 12.8678 5.56634Z"
                          :fill="fillSvgAct"
                        />
                      </svg>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <!-- dialog OTP -->
            <el-dialog :visible.sync="dialogAccepOTP" :close-on-click-modal="false" width="500px">
              <div>
                <p class="title-dialog">Chúc mừng</p>
                <p class="title-dialog">Giao dịch của bạn đã thành công</p>
                <div class="box-order">
                  <div class="line-order">
                    <div>
                      <p>
                        <b>Mã đơn hàng:</b>
                      </p>
                    </div>
                    <div>
                      <b>{{ }}</b>
                    </div>
                  </div>
                  <div class="line-order">
                    <div>
                      <p>
                        <b>Tên gói:</b>
                      </p>
                    </div>
                    <div>
                      <b>{{ }}</b>
                    </div>
                  </div>
                  <div class="line-order">
                    <div>
                      <p>
                        <b>Hạn sử dụng (ngày):</b>
                      </p>
                    </div>
                    <div>
                      <b>{{ }} ngày</b>
                    </div>
                  </div>
                  <div class="line-order">
                    <div>
                      <p>
                        <b>Giá cước:</b>
                      </p>
                    </div>
                    <div>
                      <b style="font-size: 21px;" class="money-fee-mb">{{}} VNĐ</b>
                    </div>
                  </div>
                </div>
              </div>
              <span slot="footer" class="dialog-footer" style="padding: 0 !important;"></span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <div class="el-col-lg-7 el-col-md-7 el-col-sm-24 el-col-xs-24 box-cart-info-right">
      <h3>Đơn hàng của quý khách</h3>
      <div class="buy-fee">
        <div class="buy-fee-line">
          <p>Tên gói:</p>
          <p>
            <b>{{ currentPackage.packageName ? currentPackage.packageName : 'không xác định' }}</b>
          </p>
        </div>
        <div class="buy-fee-line">
          <p>Thời gian xử lý:</p>
          <p>
            <b>{{ currentPackage.processingTime ? convertTimeToString(currentPackage.processingTime) : 'không xác định' }}</b>
          </p>
        </div>
        <div class="buy-fee-line">
          <p>Hạn sử dụng:</p>
          <p>
            <b>{{ currentPackage.numberExpireDay ? currentPackage.numberExpireDay + ' ngày' : 'không xác định' }}</b>
          </p>
        </div>
        <div class="buy-fee-line">
          <p>Số lượng:</p>
          <p>
            <b>{{ currentPackage.packageName ? '1 gói' : 'không xác định' }}</b>
          </p>
        </div>
        <div class="buy-fee-line">
          <p>Giá cước:</p>
          <p>
            <b>{{ currentPackage.amount ? formatNumber(currentPackage.amount) + ' VNĐ' : 'không xác định' }}</b>
          </p>
        </div>
        <hr />
        <div class="buy-fee-line">
          <p>Thành tiền</p>
          <p v-if="currentPackage.amount">
            <b style="font-size: 28px;" class="money-fee-mb">
              {{ formatNumber(currentPackage.amount) }}
              VNĐ
            </b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListBank from "@/components/BuyPackage/ListBank";
import AcceptOder from "@/components/BuyPackage/AcceptOder";

import { formatNumber, changeToSlug } from "@/utils/convert";
import { setStringPackage, setTradCode } from "@/utils/package";
import {
  isPhoneNumberValid,
  isEmailValid,
  isTaxCodeValid
} from "@/utils/validate";

import cities from "@/data/cities.js";
import methodOfPayments from "@/data/methodOfPayments.js";
import banks from "@/data/banks.js";

import { getPackages } from "@/api/package";

import axios from "axios";
import { switchCase } from "@babel/types";
import { mapGetters } from "vuex";

export default {
  name: "Payment",
  components: { AcceptOder, ListBank },
  computed: { ...mapGetters(["package"]) },
  data() {
    return {
      inputClass: ["form-control"],
      inputOTPClass: ["form-control"],
      fillSvgBuy: "",
      fillSvgAct: "",
      titleCartInfoClass: ["title-cart-info"],
      btnProceedPaymentClass: ["btn-proceed-payment"],
      currentStep: 1,
      isVbee: true,
      listCitys: cities,
      // step 1
      listPackages: [],
      packageGroup: {
        processingTime: [],
        amount: []
      },
      currentPackage: {
        packageId: null,
        packageName: null,
        amount: null,
        numberExpireDay: null,
        processingTime: null
      },
      error: {
        errorStep1: false,
        errorPhoneNumber: false,
        errorEmail: false,
        errorOTPCode: false,
        messageErrorStep1: "",
        messageErrorPhone: "",
        messageErrorEmail: "",
        errorPhonePayment: false,
        messsgeErrorPhonePayment: "",
        messageErrorOTP: ""
      },
      // step 2
      orders: {
        fullName: null,
        email: null,
        phoneNumber: null,
        city: null,
        note: null
      },
      // step 3
      activePayment: "",
      methodOfPayments,
      dialogAccepOTP: false,
      isSubMoneyPhone: false,
      typePayment: "1",
      tabMethodPayment: "first",
      banks,
      phonePayment: "",
      loading: false,
      // payment
      otpCode: "",
      disableInputOTP: false,
      isCount: false,
      disableConfirmOTP: false
    };
  },
  watch: {
    "currentPackage.name": function(value) {
      this.handleChangePackage(value);
    },
    "currentPackage.processingTime": function(value) {
      this.handleChangeProcessTime(value);
    }
  },
  methods: {
    setStringPackage,
    loadCss() {
      this.titleCartInfoClass = ["title-cart-info", "title-cart-info-mb"];
      this.btnProceedPaymentClass = [
        "btn-proceed-payment",
        "btn-proceed-payment-mb"
      ];
      if (this.isVbee) {
        this.fillSvgBuy = "#FFC000";
        this.fillSvgAct = "#000000";
      } else {
        this.fillSvgBuy = "#0061AF";
        this.fillSvgAct = "#ffffff";
      }
    },
    loadCurrentPackage() {
      const {
        packageId,
        packageName,
        amount,
        numberExpireDay,
        processingTime
      } = this.package;

      this.currentPackage = {
        packageId,
        packageName,
        amount,
        numberExpireDay,
        processingTime
      };
    },
    gotoStep2() {
      if (!this.handleCheckPackageName()) return;
      if (!this.handleCheckProcessingTime()) return;
      this.currentStep = 2;
    },
    gotoStep3() {
      if (!this.handleCheckPhone()) {
        const { messageErrorPhone } = this.error;
        this.$message({
          type: "error",
          message: messageErrorPhone,
          offset: 50
        });
        return;
      }

      if (!this.handleCheckEmail()) {
        const { messageErrorEmail } = this.error;
        this.$message({
          type: "error",
          message: messageErrorEmail,
          offset: 50
        });
        return;
      }
      this.currentStep = 3;
    },
    changeError() {
      this.inputClass = ["form-control"];
    },
    onGotoStep(step) {
      this.currentStep = step;
    },
    formatNumber,
    convertTimeToString(value) {
      const time = value * 60;
      if (time > 60) return value + " giờ";
      return time + " phút";
    },
    handleChangePackage(value) {
      for (const { code, processing_time, number_expire_day, amount } of this
        .listPackages) {
        if (code === value) {
          this.packageGroup = {
            processingTime: processing_time,
            amount
          };
          this.currentPackage.numberExpireDay = number_expire_day;
          this.currentPackage.amount = null;
          this.currentPackage.processingTime = null;
          break;
        }
      }

      this.handleCheckPackageName();
    },
    handleChangeProcessTime(value) {
      const { processingTime, amount } = this.packageGroup;
      const index = processingTime.indexOf(value);
      if (index !== -1 && index < amount.length) {
        this.currentPackage.amount = amount[index];
      }

      this.handleCheckProcessingTime();
    },
    handleCheckPackageName() {
      const { packageName } = this.currentPackage;
      if (!packageName) {
        this.$message({
          type: "error",
          message: "Bạn chưa chọn gói cước",
          offset: 50
        });
        this.error.errorStep1 = true;
        this.error.messageErrorStep1 = "Bạn chưa chọn gói";
        return false;
      }

      this.error.errorStep1 = false;
      this.error.messageErrorStep1 = "";
      return true;
    },
    handleCheckProcessingTime() {
      const { processingTime } = this.currentPackage;
      if (!processingTime) {
        this.$message({
          type: "error",
          message: "Bạn chưa chọn thời gian xử lý",
          offset: 50
        });
        this.error.errorStep1 = true;
        this.error.messageErrorStep1 = "Bạn chưa chọn thời gian xử lý";
        return false;
      }

      this.error.errorStep1 = false;
      this.error.messageErrorStep1 = "";
      return true;
    },
    handleCheckPhone() {
      const { phoneNumber } = this.orders;
      const { errorPhoneNumber } = this.error;
      if (!phoneNumber) {
        this.error.errorPhoneNumber = true;
        this.error.messageErrorPhone = "Vui lòng nhập số điện thoại";
        return false;
      }

      if (!isPhoneNumberValid(phoneNumber)) {
        this.error.errorPhoneNumber = true;
        this.error.messageErrorPhone = "Số điện thoại không đúng định dạng";
        return false;
      }

      this.error.errorPhoneNumber = false;
      this.error.messageErrorPhone = "";
      return true;
    },
    handleCheckEmail() {
      const { email } = this.orders;
      if (email && email.length > 0) {
        if (!isEmailValid(email)) {
          this.error.errorEmail = true;
          this.error.messageErrorEmail = "Email không đúng định dạng";
          return false;
        }
      }
      this.error.errorEmail = false;
      this.error.messageErrorEmail = "";
      return true;
    },
    handleCheckPhonePayment() {
      if (!this.phonePayment || this.phonePayment === "") {
        this.error.errorPhonePayment = true;
        this.error.messsgeErrorPhonePayment =
          "Vui lòng nhập số điện thoại thanh toán";
        return false;
      }
      if (!isPhoneNumberValid(this.phonePayment)) {
        this.error.errorPhonePayment = true;
        this.error.messsgeErrorPhonePayment =
          "Số điện thoại không đúng định dạng";
        return false;
      }

      this.error.errorPhonePayment = false;
      this.error.messsgeErrorPhonePayment = "";
      return true;
    },
    onConfirmOrders() {
      this.loading = true;
      if (!this.handleCheckPhonePayment()) {
        this.$message({
          type: "error",
          message: this.error.messsgeErrorPhonePayment
        });
        this.inputClass.push("form-control-error");
        this.loading = false;
        return;
      }
      this.isSubMoneyPhone = true;
      // call api get captcha
    },
    resendOTP() {},
    handleCountdownEnd() {}
  },
  mounted() {
    this.loadCurrentPackage();
  },
  created() {
    this.loadCss();
  },
  async asyncData() {
    return getPackages()
      .then(res => {
        const { status, result } = res;
        if (status === 1) {
          const data = {};
          for (const item of result) {
            const { code, id, amount, processing_time } = item;
            if (data[code] === undefined) {
              data[code] = {
                ...item,
                id: [id],
                amount: [amount],
                processing_time: [processing_time]
              };
            } else {
              data[code].id.unshift(id);
              data[code].amount.unshift(amount);
              data[code].processing_time.unshift(processing_time);
            }
          }
          const listPackages = [];
          for (const item in data) {
            if (data.hasOwnProperty(item)) {
              const pkg = data[item];
              listPackages.push(pkg);
            }
          }
          return { listPackages };
        }
      })
      .catch(err => {
        return { listPackages: [] };
      });
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/buy-package/payment";
</style>
