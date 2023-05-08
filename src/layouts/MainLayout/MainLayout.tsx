import Header from "../../components/Header";

interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className="p-relative">
      <Header />
      {children}
      <div id="snackbar"></div>
      <footer className="d-flex jc-center">© Copyright 2023 Bao Bui</footer>
    </div>
  );
}
