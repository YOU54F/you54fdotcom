import { createGlobalStyle } from "styled-components";

export const DeviceStyles = createGlobalStyle`

.marvel-device {
  display: inline-block;
  position: relative;
  -webkit-box-sizing: content-box !important;
  box-sizing: content-box !important;
}
.marvel-device .screen {
  width: 100%;
  position: relative;
  height: 100%;
  z-index: 3;
  background: white;
  overflow: hidden;
  display: block;
  border-radius: 1px;
  -webkit-box-shadow: 0 0 0 3px #111;
  box-shadow: 0 0 0 3px #111;
}
.marvel-device .top-bar,
.marvel-device .bottom-bar {
  height: 3px;
  background: black;
  width: 100%;
  display: block;
}
.marvel-device .middle-bar {
  width: 3px;
  height: 4px;
  top: 0px;
  left: 90px;
  background: black;
  position: absolute;
}
.marvel-device.iphone8 {
  width: 375px;
  height: 667px;
  padding: 105px 24px;
  background: #d9dbdc;
  border-radius: 56px;
  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);
}
.marvel-device.iphone8:before {
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  position: absolute;
  top: 6px;
  content: "";
  left: 6px;
  border-radius: 50px;
  background: #f8f8f8;
  z-index: 1;
}
.marvel-device.iphone8:after {
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  position: absolute;
  top: 8px;
  content: "";
  left: 8px;
  border-radius: 48px;
  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;
  z-index: 2;
}
.marvel-device.iphone8 .home {
  border-radius: 100%;
  width: 68px;
  height: 68px;
  position: absolute;
  left: 50%;
  margin-left: -34px;
  bottom: 22px;
  z-index: 3;
  background: #303233;
  background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
}
.marvel-device.iphone8 .home:before {
  background: #f8f8f8;
  position: absolute;
  content: "";
  border-radius: 100%;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  top: 4px;
  left: 4px;
}
.marvel-device.iphone8 .top-bar {
  height: 14px;
  background: #bfbfc0;
  position: absolute;
  top: 68px;
  left: 0;
}
.marvel-device.iphone8 .bottom-bar {
  height: 14px;
  background: #bfbfc0;
  position: absolute;
  bottom: 68px;
  left: 0;
}
.marvel-device.iphone8 .sleep {
  position: absolute;
  top: 190px;
  right: -4px;
  width: 4px;
  height: 66px;
  border-radius: 0px 2px 2px 0px;
  background: #d9dbdc;
}
.marvel-device.iphone8 .volume {
  position: absolute;
  left: -4px;
  top: 188px;
  z-index: 0;
  height: 66px;
  width: 4px;
  border-radius: 2px 0px 0px 2px;
  background: #d9dbdc;
}
.marvel-device.iphone8 .volume:before {
  position: absolute;
  left: 2px;
  top: -78px;
  height: 40px;
  width: 2px;
  border-radius: 2px 0px 0px 2px;
  background: inherit;
  content: "";
  display: block;
}
.marvel-device.iphone8 .volume:after {
  position: absolute;
  left: 0px;
  top: 82px;
  height: 66px;
  width: 4px;
  border-radius: 2px 0px 0px 2px;
  background: inherit;
  content: "";
  display: block;
}
.marvel-device.iphone8 .camera {
  background: #3c3d3d;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 24px;
  left: 50%;
  margin-left: -6px;
  border-radius: 100%;
  z-index: 3;
}
.marvel-device.iphone8 .sensor {
  background: #3c3d3d;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 49px;
  left: 134px;
  z-index: 3;
  border-radius: 100%;
}
.marvel-device.iphone8 .speaker {
  background: #292728;
  width: 70px;
  height: 6px;
  position: absolute;
  top: 54px;
  left: 50%;
  margin-left: -35px;
  border-radius: 6px;
  z-index: 3;
}
.marvel-device.iphone8.gold {
  background: #f9e7d3;
}
.marvel-device.iphone8.gold .top-bar,
.marvel-device.iphone8.gold .bottom-bar {
  background: white;
}
.marvel-device.iphone8.gold .sleep,
.marvel-device.iphone8.gold .volume {
  background: #f9e7d3;
}
.marvel-device.iphone8.gold .home {
  background: #cebba9;
  background: linear-gradient(135deg, #cebba9 0%, #f9e7d3 50%, #cebba9 100%);
}
.marvel-device.iphone8.black {
  background: #464646;
  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7);
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7);
}
.marvel-device.iphone8.black:before {
  background: #080808;
}
.marvel-device.iphone8.black:after {
  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121;
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121;
}
.marvel-device.iphone8.black .top-bar,
.marvel-device.iphone8.black .bottom-bar {
  background: #212121;
}
.marvel-device.iphone8.black .volume,
.marvel-device.iphone8.black .sleep {
  background: #464646;
}
.marvel-device.iphone8.black .camera {
  background: #080808;
}
.marvel-device.iphone8.black .home {
  background: #080808;
  background: linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%);
}
.marvel-device.iphone8.black .home:before {
  background: #080808;
}
.marvel-device.iphone8.landscape {
  padding: 24px 105px;
  height: 375px;
  width: 667px;
}
.marvel-device.iphone8.landscape .sleep {
  top: 100%;
  border-radius: 0px 0px 2px 2px;
  right: 190px;
  height: 4px;
  width: 66px;
}
.marvel-device.iphone8.landscape .volume {
  width: 66px;
  height: 4px;
  top: -4px;
  left: calc(100% - 188px - 66px);
  border-radius: 2px 2px 0px 0px;
}
.marvel-device.iphone8.landscape .volume:before {
  width: 40px;
  height: 2px;
  top: 2px;
  right: -78px;
  left: auto;
  border-radius: 2px 2px 0px 0px;
}
.marvel-device.iphone8.landscape .volume:after {
  left: -82px;
  width: 66px;
  height: 4px;
  top: 0;
  border-radius: 2px 2px 0px 0px;
}
.marvel-device.iphone8.landscape .top-bar {
  width: 14px;
  height: 100%;
  left: calc(100% - 68px - 14px);
  top: 0;
}
.marvel-device.iphone8.landscape .bottom-bar {
  width: 14px;
  height: 100%;
  left: 68px;
  top: 0;
}
.marvel-device.iphone8.landscape .home {
  top: 50%;
  margin-top: -34px;
  margin-left: 0;
  left: 22px;
}
.marvel-device.iphone8.landscape .sensor {
  top: 134px;
  left: calc(100% - 49px - 16px);
}
.marvel-device.iphone8.landscape .speaker {
  height: 70px;
  width: 6px;
  left: calc(100% - 54px - 6px);
  top: 50%;
  margin-left: 0px;
  margin-top: -35px;
}
.marvel-device.iphone8.landscape .camera {
  left: calc(100% - 32px);
  top: 50%;
  margin-left: 0px;
  margin-top: -5px;
}

.marvel-device.ipad {
  width: 576px;
  height: 768px;
  padding: 90px 25px;
  background: #242324;
  border-radius: 44px;
}
.marvel-device.ipad:before {
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  position: absolute;
  content: "";
  display: block;
  top: 4px;
  left: 4px;
  border-radius: 40px;
  background: #1e1e1e;
}
.marvel-device.ipad .camera {
  background: #3c3d3d;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 44px;
  left: 50%;
  margin-left: -5px;
  border-radius: 100%;
}
.marvel-device.ipad .top-bar,
.marvel-device.ipad .bottom-bar {
  display: none;
}
.marvel-device.ipad .home {
  background: #242324;
  border-radius: 36px;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  margin-left: -25px;
  bottom: 22px;
}
.marvel-device.ipad .home:after {
  width: 15px;
  height: 15px;
  margin-top: -8px;
  margin-left: -8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: absolute;
  display: block;
  content: "";
  top: 50%;
  left: 50%;
}
.marvel-device.ipad.landscape {
  height: 576px;
  width: 768px;
  padding: 25px 90px;
}
.marvel-device.ipad.landscape .camera {
  left: calc(100% - 44px);
  top: 50%;
  margin-left: 0;
  margin-top: -5px;
}
.marvel-device.ipad.landscape .home {
  top: 50%;
  left: 22px;
  margin-left: 0;
  margin-top: -25px;
}
.marvel-device.ipad.silver {
  background: #bcbcbc;
}
.marvel-device.ipad.silver:before {
  background: #fcfcfc;
}
.marvel-device.ipad.silver .home {
  background: #fcfcfc;
  -webkit-box-shadow: inset 0 0 0 1px #bcbcbc;
  box-shadow: inset 0 0 0 1px #bcbcbc;
}
.marvel-device.ipad.silver .home:after {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.marvel-device.macbook {
  width: 960px;
  height: 600px;
  padding: 44px 44px 76px;
  margin: 0 auto;
  background: #bebebe;
  border-radius: 34px;
}
.marvel-device.macbook:before {
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  position: absolute;
  content: "";
  display: block;
  top: 4px;
  left: 4px;
  border-radius: 30px;
  background: #1e1e1e;
}
.marvel-device.macbook .top-bar {
  width: calc(100% + 2 * 70px);
  height: 40px;
  position: absolute;
  content: "";
  display: block;
  top: 680px;
  left: -70px;
  border-bottom-left-radius: 90px 18px;
  border-bottom-right-radius: 90px 18px;
  background: #bebebe;
  -webkit-box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6);
  box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6);
}
.marvel-device.macbook .top-bar:before {
  width: 100%;
  height: 24px;
  content: "";
  display: block;
  top: 0;
  left: 0;
  background: #f0f0f0;
  border-bottom: 2px solid #aaa;
  border-radius: 5px;
  position: relative;
}
.marvel-device.macbook .top-bar:after {
  width: 16%;
  height: 14px;
  content: "";
  display: block;
  top: 0;
  background: #ddd;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 0 0 20px 20px;
  -webkit-box-shadow: inset 0px -3px 10px #999;
  box-shadow: inset 0px -3px 10px #999;
}
.marvel-device.macbook .bottom-bar {
  background: transparent;
  width: calc(100% + 2 * 70px);
  height: 26px;
  position: absolute;
  content: "";
  display: block;
  top: 680px;
  left: -70px;
}
.marvel-device.macbook .bottom-bar:before,
.marvel-device.macbook .bottom-bar:after {
  height: calc(100% - 2px);
  width: 80px;
  content: "";
  display: block;
  top: 0;
  position: absolute;
}
.marvel-device.macbook .bottom-bar:before {
  left: 0;
  background: #f0f0f0;
  background: -webkit-gradient(linear, left top, right top, from(#747474), color-stop(5%, #c3c3c3), color-stop(14%, #ebebeb), color-stop(41%, #979797), color-stop(80%, #f0f0f0), color-stop(100%, #f0f0f0), to(#f0f0f0));
  background: linear-gradient(to right, #747474 0%, #c3c3c3 5%, #ebebeb 14%, #979797 41%, #f0f0f0 80%, #f0f0f0 100%, #f0f0f0 100%);
}
.marvel-device.macbook .bottom-bar:after {
  right: 0;
  background: #f0f0f0;
  background: -webkit-gradient(linear, left top, right top, from(#f0f0f0), color-stop(0%, #f0f0f0), color-stop(20%, #f0f0f0), color-stop(59%, #979797), color-stop(86%, #ebebeb), color-stop(95%, #c3c3c3), to(#747474));
  background: linear-gradient(to right, #f0f0f0 0%, #f0f0f0 0%, #f0f0f0 20%, #979797 59%, #ebebeb 86%, #c3c3c3 95%, #747474 100%);
}
.marvel-device.macbook .camera {
  background: #3c3d3d;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -5px;
  border-radius: 100%;
}
.marvel-device.macbook .home {
  display: none;
}
.marvel-device.ipad {
  width: 576px;
  height: 768px;
  padding: 90px 25px;
  background: #242324;
  border-radius: 44px;
}
.marvel-device.ipad:before {
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  position: absolute;
  content: "";
  display: block;
  top: 4px;
  left: 4px;
  border-radius: 40px;
  background: #1e1e1e;
}
.marvel-device.ipad .camera {
  background: #3c3d3d;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 44px;
  left: 50%;
  margin-left: -5px;
  border-radius: 100%;
}
.marvel-device.ipad .top-bar,
.marvel-device.ipad .bottom-bar {
  display: none;
}
.marvel-device.ipad .home {
  background: #242324;
  border-radius: 36px;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  margin-left: -25px;
  bottom: 22px;
}
.marvel-device.ipad .home:after {
  width: 15px;
  height: 15px;
  margin-top: -8px;
  margin-left: -8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: absolute;
  display: block;
  content: "";
  top: 50%;
  left: 50%;
}
.marvel-device.ipad.landscape {
  height: 576px;
  width: 768px;
  padding: 25px 90px;
}
.marvel-device.ipad.landscape .camera {
  left: calc(100% - 44px);
  top: 50%;
  margin-left: 0;
  margin-top: -5px;
}
.marvel-device.ipad.landscape .home {
  top: 50%;
  left: 22px;
  margin-left: 0;
  margin-top: -25px;
}
.marvel-device.ipad.silver {
  background: #bcbcbc;
}
.marvel-device.ipad.silver:before {
  background: #fcfcfc;
}
.marvel-device.ipad.silver .home {
  background: #fcfcfc;
  -webkit-box-shadow: inset 0 0 0 1px #bcbcbc;
  box-shadow: inset 0 0 0 1px #bcbcbc;
}
.marvel-device.ipad.silver .home:after {
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.marvel-device.macbook {
  width: 960px;
  height: 600px;
  padding: 44px 44px 76px;
  margin: 0 auto;
  background: #bebebe;
  border-radius: 34px;
}
.marvel-device.macbook:before {
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  position: absolute;
  content: "";
  display: block;
  top: 4px;
  left: 4px;
  border-radius: 30px;
  background: #1e1e1e;
}
.marvel-device.macbook .top-bar {
  width: calc(100% + 2 * 70px);
  height: 40px;
  position: absolute;
  content: "";
  display: block;
  top: 680px;
  left: -70px;
  border-bottom-left-radius: 90px 18px;
  border-bottom-right-radius: 90px 18px;
  background: #bebebe;
  -webkit-box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6);
  box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6);
}
.marvel-device.macbook .top-bar:before {
  width: 100%;
  height: 24px;
  content: "";
  display: block;
  top: 0;
  left: 0;
  background: #f0f0f0;
  border-bottom: 2px solid #aaa;
  border-radius: 5px;
  position: relative;
}
.marvel-device.macbook .top-bar:after {
  width: 16%;
  height: 14px;
  content: "";
  display: block;
  top: 0;
  background: #ddd;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 0 0 20px 20px;
  -webkit-box-shadow: inset 0px -3px 10px #999;
  box-shadow: inset 0px -3px 10px #999;
}
.marvel-device.macbook .bottom-bar {
  background: transparent;
  width: calc(100% + 2 * 70px);
  height: 26px;
  position: absolute;
  content: "";
  display: block;
  top: 680px;
  left: -70px;
}
.marvel-device.macbook .bottom-bar:before,
.marvel-device.macbook .bottom-bar:after {
  height: calc(100% - 2px);
  width: 80px;
  content: "";
  display: block;
  top: 0;
  position: absolute;
}
.marvel-device.macbook .bottom-bar:before {
  left: 0;
  background: #f0f0f0;
  background: -webkit-gradient(linear, left top, right top, from(#747474), color-stop(5%, #c3c3c3), color-stop(14%, #ebebeb), color-stop(41%, #979797), color-stop(80%, #f0f0f0), color-stop(100%, #f0f0f0), to(#f0f0f0));
  background: linear-gradient(to right, #747474 0%, #c3c3c3 5%, #ebebeb 14%, #979797 41%, #f0f0f0 80%, #f0f0f0 100%, #f0f0f0 100%);
}
.marvel-device.macbook .bottom-bar:after {
  right: 0;
  background: #f0f0f0;
  background: -webkit-gradient(linear, left top, right top, from(#f0f0f0), color-stop(0%, #f0f0f0), color-stop(20%, #f0f0f0), color-stop(59%, #979797), color-stop(86%, #ebebeb), color-stop(95%, #c3c3c3), to(#747474));
  background: linear-gradient(to right, #f0f0f0 0%, #f0f0f0 0%, #f0f0f0 20%, #979797 59%, #ebebeb 86%, #c3c3c3 95%, #747474 100%);
}
.marvel-device.macbook .camera {
  background: #3c3d3d;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -5px;
  border-radius: 100%;
}
.marvel-device.macbook .home {
  display: none;
}
`;
