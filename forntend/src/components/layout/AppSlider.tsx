import { Card, Layout, List, Typography, Statistic, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useAppSelector } from "../../hooks";
import { CSSProperties } from "react";
import { Status } from "../../store/types";

const siderStyle: CSSProperties = {
  padding: "1rem",
  overflow: 'hidden',
};

export default function AppSlider() {
  const {items, status} = useAppSelector(state => state.assets)
  
  return (
    <>
      {status === Status.SUCCESS && <Layout.Sider width={350} style={siderStyle}>
        {items.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.name)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? "#3f8600" : "#cf1322",
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
              />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { 
                  title: "Asset Amount", 
                  value: asset.amount, 
                  isPlain: true
                },
                {
                  title: 'Date of purchase',
                  value: new Date(asset.date).toLocaleTimeString([], {
                    day: 'numeric', 
                    month: 'numeric',
                    year: 'numeric',
                    hour: '2-digit', 
                    minute: '2-digit'
                  }),
                  isPlain: true
                }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {(+item.value).toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>}
    </>
  );
}
