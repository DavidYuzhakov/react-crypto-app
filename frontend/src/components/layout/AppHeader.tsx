import { CSSProperties, useEffect, useState } from "react";

import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useAppSelector } from "../../hooks";
import CoinModal from "../CoinModal";
import AddAssetForm from "../AddAssetForm";
import { CryptoItem } from "../../store/cryptoSlice";

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "1rem",
  textAlign: "center",
};

export default function AppHeader() {
  const crypto = useAppSelector(state => state.crypto.items)

  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState<CryptoItem>()
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)


  useEffect(() => {
    if (!drawer) {
      const keypress = (e: KeyboardEvent) => {
        if (e.key === '/') {
          setSelect(prev => !prev)
        }
      }
      document.addEventListener('keypress', keypress)
      
      return () => document.removeEventListener('keypress', keypress)
    }
  }, [drawer])

  function selectHandler (value: string) {
    setCoin(crypto.find(c => c.id === value) ?? crypto[0])
    setModal(true)
  } 

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250
        }}
        open={select}
        onSelect={selectHandler}
        onClick={() => setSelect(prev => !prev)}
        value={`Press / to open`}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={(options) => (
          <Space>
            <img width={20} src={options.data.icon} alt={options.data.value} />
            {options.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      <Modal 
        open={modal} 
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinModal coin={coin!} />
      </Modal>
      <Drawer 
        width={600} 
        title={'Add Asset'} 
        onClose={() => setDrawer(false)} 
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
    
  );
}
