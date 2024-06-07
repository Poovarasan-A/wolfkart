import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productsAction";
import Products from "./products/Products";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import { Carousel } from "react-responsive-carousel";
import Footer from "./layouts/Footer";
// import ReactPaginate from "react-paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );
  console.log(products);
  useEffect(() => {
    dispatch(getAllProducts(null, null, null, null));
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />
          <div className=" my-2 w-full flex flex-col box-border pt-[4rem] lg:pt-[4rem] bg-white overflow-x-hidden lg:px-10">
            <Carousel
              className="lg:w-full lg:h-full flex flex-col pt-3"
              autoPlay
              infiniteLoop
              showThumbs={false}
              showArrows={false}
            >
              <div>
                <div className="lg:flex hidden">
                  <img src="/images/products/e1.jpg" alt="product" />
                </div>
                <div className="lg:hidden">
                  <img src="/images/products/e10.jpg" alt="product" />
                </div>
              </div>
              <div>
                <div className="lg:flex hidden">
                  <img src="/images/products/e3.jpg" alt="product" />
                </div>
                <div className="lg:hidden">
                  <img src="/images/products/e30.jpg" alt="product" />
                </div>
              </div>

              <div>
                <div className="lg:flex hidden">
                  <img src="/images/products/e2.jpg" alt="product" />
                </div>
                <div className="lg:hidden">
                  <img src="/images/products/e20.jpg" alt="product" />
                </div>
              </div>
            </Carousel>
            <h2 className="font-bold text-2xl my-3 pl-2 lg:pl-0">
              Explore Products
            </h2>
            <div className="w-full h-full flex flex-wrap justify-center gap-5 bg-neutral-200 bg-opacity-70 items-center pt-2">
              {products &&
                products.map((product) => (
                  <Products key={product._id} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </Fragment>
  );
};
export default Home;
