import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { TranslateText } from '../../translations/TranslateText'; // Asegúrate de que el nombre coincida

const Usa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.foxnews.com/api/article-search?searchBy=categories&values=fox-news%2Fus&size=5&from=${(pageNumber - 1) * 5}`);
      const articles = response.data;

      // Traducir title y description de cada artículo
      const translatedArticles = await Promise.all(articles.map(async (article) => {
        const translatedTitle = await TranslateText(article.title);
        const translatedDescription = await TranslateText(article.description);

        return {
          ...article,
          title: translatedTitle,
          description: translatedDescription,
        };
      }));

      if (translatedArticles.length < 5) {
        setHasMore(false); // No hay más datos para cargar
      }

      setData(prevData => [...prevData, ...translatedArticles]);
      setPage(pageNumber);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const loadMore = () => {
    if (hasMore) {
      fetchData(page + 1);
    }
  };

  if (loading && page === 1) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((article, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      ))}
      {hasMore && (
        <Button title="Load More" onPress={loadMore} />
      )}
      {loading && !hasMore && (
        <Text>No more articles</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Usa;








