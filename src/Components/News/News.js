import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import axios from "axios";
import { API_KEY } from "../../Config/Config";
import "./News.css";
import newsLoading from "../../Images/newsLoading.gif";
import { Input, Space } from "antd";

const { Search } = Input;

function News() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    getNews();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, pageSize]);

  const getNews = async (values) => {
    if (!values) {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&pageSize=100&sortBy=publishedAt&apiKey=${API_KEY}&language=en`
        );

        setNews(response?.data?.articles);
        setTotalResults(response?.data?.totalResults);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Something went wrong...Please try again after sometimes...");
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${values}&pageSize=100&sortBy=publishedAt&apiKey=${API_KEY}&language=en`
        );
        setNews(response?.data?.articles);
        setTotalResults(response?.data?.totalResults);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Something went wrong...Please try again after sometimes...");
      }
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const newsCards = news
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    .map((article) => (
      <Card
        key={article?.title}
        title={<span title={article?.title}>{article?.title}</span>}
        style={{ width: "100%", marginBottom: "20px" }}
        className="news-title"
      >
        <img
          src={article?.urlToImage}
          alt={article?.title}
          style={{ width: "100%" }}
          className="news-img"
        />
        <p style={{ marginTop: "10px" }}>{article?.description}</p>
      </Card>
    ));

  return (
    <div>
      <div>
        <Space direction="vertical" className="search">
          <Search
            placeholder="Search here"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={getNews}
          />
        </Space>
      </div>
      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        ""
      )}

      <div style={{ marginTop: "100px" }}>
        {loading ? (
          <img src={newsLoading} alt="Loading..." className="loadingImg" />
        ) : (
          <>
            {newsCards?.length > 0 ? (
              newsCards
            ) : (
              <p className="noNews">No News Found...</p>
            )}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalResults}
              onChange={handlePageChange}
              style={{ textAlign: "center" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default News;
