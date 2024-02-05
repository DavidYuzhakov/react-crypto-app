import { useEffect } from "react";
import { Layout, Spin } from "antd";

import AppHeader from "./AppHeader";
import AppSlider from "./AppSlider";
import AppContent from "./AppContent";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCrypto } from "../../store/cryptoSlice";
import { fetchAssets } from "../../store/assetsSlice";
import { Status } from "../../store/types";

export default function AppLayout () {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.assets) 

  useEffect(() => {
    dispatch(fetchCrypto())
    dispatch(fetchAssets())
  }, [])

  return (
    <>
      {status === Status.SUCCESS && <Layout>
        <AppHeader />
        <Layout>
          <AppSlider />
          <AppContent />
        </Layout>
      </Layout>}
      {status === Status.LOADING && <Spin fullscreen />}
      {status === Status.ERROR && alert('Произошла ошибка пожалуйста повторите позже (')}
    </>
  )
}