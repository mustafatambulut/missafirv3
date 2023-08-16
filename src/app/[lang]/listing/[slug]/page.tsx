"use client";

const Page = ({ params }: any) => {
  const { slug } = params;
  return (
    <div className="pt-16 lg:pt-40">
      <h1>Listing Detail Page</h1>
      <p>Your id: {slug}!</p>
    </div>
  );
};

export default Page;
