import { Link, Outlet } from "umi";
import { App, ConfigProvider, Switch, theme } from "antd";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Auth from "./Auth";
import "./index.less";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import moment from "moment";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(0);
  const timer = useRef<any>();
  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, [time]);

  const setTheme = (matches: boolean) => {
    if (matches) {
      document.documentElement.setAttribute("data-theme", "light");
      console.log("first light");
      setDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode(true);
    }
  };
  useLayoutEffect(() => {
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    setTheme(themeMedia.matches);
    themeMedia.addListener((e) => {
      setTheme(e.matches);
    });
  }, []);
  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    if(h>0){
      return `${h}小时${m }分钟${s}秒`;
    }
    if(m>0){
      return `${m}分钟${s}秒`;
    }
    return `${s}秒`;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Auth>
        <div className="layouts">
          <div className="header">
            <div>
              <span>{moment().format("YYYY-MM-DD HH:mm:ss")}</span>
              <span className="time-span">{`已登录时长：${formatTime(time)}`}</span>
            </div>
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={darkMode}
              onChange={(value) => setTheme(!value)}
            />
          </div>
          <Outlet />
        </div>
      </Auth>
    </ConfigProvider>
  );
}
