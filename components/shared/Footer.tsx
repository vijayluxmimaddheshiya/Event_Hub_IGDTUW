'use client'
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleQuerySubmit = (e: any) => {
    e.preventDefault();
    const query = e.target.query.value;
    if (query.trim() !== "") {
      window.location.href = `mailto:sakshi053btcsai21@igdtuw.ac.in?subject=Website Query&body=${encodeURIComponent(
        query
      )}`;
    }
  };

  return (
    <footer className="border-t" style={{ backgroundColor: "#f0adca", color: "white", padding: "20px" }}>
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
      
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>
      </div>

      {/* Query Form */}
      <div className="query-form pb-5" style={{ textAlign: "center", marginTop: "20px" }}>
        <h3 className="p-5 text-black h5-bold">Have a Query? Reach Out to Us!</h3>
        <form onSubmit={handleQuerySubmit}>
          <input
            type="text"
            name="query"
            placeholder="Type your query here"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid white",
              marginRight: "10px",
              width: "60%",
              color:"black"
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#be185d",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>

    </footer>
  );
};

export default Footer;
