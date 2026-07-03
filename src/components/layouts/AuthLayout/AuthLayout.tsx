import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: PropTypes) => {
  return (
    <Fragment>
      <PageHead title={title} />

      <main className="min-h-screen bg-linear-to-b from-blue-200 via-white to-white px-5 py-8 md:px-8 lg:px-12">
        <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
          {children}
        </section>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
