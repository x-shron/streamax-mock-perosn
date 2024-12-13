import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import "./index.less";
import { request } from "@/service";
import { useState } from "react";
const baseRequired = [
  "ip",
  "port",
  "protocol",
  // "_tenantId",
  // "_appId",
  // "_userId",
  '_token'
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const save = (
    params: any,
    { protocol, ip, port, _tenantId, _appId, _userId,_token }: any
  ) => {
    setLoading(true);
    request({
      data: params,
      url: `${protocol}://${ip}${port ? `:${port}` : ""}/gateway/ks-manager/internal/person/device/simulate`,
      method: "POST",
      headers: {
        _tenantId,
        _appId,
        _userId,
        _token
      },
    })
      .then((res: any) => {
        console.log("13123123", res);
        if(res.data.success){
            message.success("操作成功");
        }else{
          message.error(`操作失败: ${res.data.message}`);
        }
      },(e)=>{
        message.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const online = (deviceOnlineState: any) => {
    form
      .validateFields([...baseRequired, "deviceNum", "deviceStartNumber"])
      .then((values) => {
        setLoading(true);
        const { deviceNum, deviceStartNumber } = values;
        save({ deviceOnlineState, deviceNum, deviceStartNumber }, values);
      });
  };

  const sumbit = (gpsSendState: any) => {
    if (gpsSendState === 0) {
      // 停止下发gps
      form
        .validateFields([...baseRequired, "deviceNum", "deviceStartNumber"])
        .then((values) => {
          setLoading(true);
          const { deviceNum, deviceStartNumber } = values;
          save({ deviceNum, deviceStartNumber }, values);
        });
    } else {
      // 开始下发gps
      form.validateFields().then((values) => {
        setLoading(true);
        const { gpsInfoList, deviceNum, deviceStartNumber, gpsInterval } =
          values;
        const gpsList = gpsInfoList.split("\n").map((item: any) => {
          const [lng, lat,type,mapId,x,y,z] = item.split(",");
          return {
            lng,
            lat,
            type,
            mapId,x,y,z
          };
        });
        save(
          {
            gpsInfoList: gpsList,
            gpsSendState,
            deviceNum,
            deviceStartNumber,
            gpsInterval,
          },
          values
        );
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="mock-person-gps">
        <div>
          <Form form={form} layout="vertical">
            <p className="mock-person-gps-title">用户信息</p>
            <Row gutter={60}>
              <Col span={24}>
                <Form.Item
                  label="token"
                  name="_token"
                  rules={[{ required: true, message: "请输入token" }]}
                >
                  <Input.TextArea rows={5} placeholder="请输入token" />
                </Form.Item>
              </Col>
              {/* <Col span={8}>
                <Form.Item
                  label="用户id"
                  name="_userId"
                  rules={[{ required: true, message: "请输入用户id" }]}
                >
                  <Input placeholder="请输入用户id" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="应用id"
                  name="_appId"
                  initialValue={10999}
                  rules={[{ required: true, message: "请输入应用id" }]}
                >
                  <Input placeholder="请输入应用id" />
                </Form.Item>
              </Col> */}
            </Row>
            <p className="mock-person-gps-title">设备服务器信息</p>
            <Row gutter={60}>
              <Col span={8}>
                <Form.Item
                  label="协议"
                  name="protocol"
                  rules={[{ required: true }]}
                  initialValue={"https"}
                >
                  <Select
                    placeholder="请选择协议"
                    options={[
                      { value: "http", label: "http" },
                      { value: "https", label: "https" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="服务器IP"
                  name="ip"
                  rules={[{ required: true, message: "请输入服务器IP" }]}
                >
                  <Input placeholder="请输入服务器IP" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="服务器端口"
                  name="port"
                  initialValue={20551}
                >
                  <Input placeholder="请输入服务器端口" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="设备起始编号"
                  name="deviceStartNumber"
                  rules={[{ required: true, message: "请输入设备起始编号" }]}
                >
                  <Input placeholder="请输入设备起始编号" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="设备数量"
                  name="deviceNum"
                  rules={[{ required: true, message: "请输入设备数量" }]}
                  initialValue={10}
                >
                  <InputNumber placeholder="请输入设备数量" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  initialValue={10}
                  label="GPS间隔时间（秒）"
                  name="gpsInterval"
                >
                  <InputNumber placeholder="请输入GPS间隔时间" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="gpsInfoList"
                  label="GPS信息列表"
                >
                  <Input.TextArea
                    placeholder="请输入GPS信息列表, 每个gps点需换行输入, 格式为:&#10;经度,纬度,type,mapId,x,y,z"
                    rows={6}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Space className="mock-person-gps-button" size={20}>
            <Button onClick={() => online(0)} danger size="large">
              下线
            </Button>
            <Button
              color="default"
              onClick={() => online(1)}
              type="primary"
              size="large"
            >
              上线
            </Button>
            <Button onClick={() => sumbit(0)} size="large">
              停止下发gps
            </Button>
            <Button onClick={() => sumbit(1)} size="large" type="primary">
              开始下发gps
            </Button>
          </Space>
        </div>
      </div>
    </Spin>
  );
}
