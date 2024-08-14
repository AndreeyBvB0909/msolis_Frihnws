import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { TranslateText } from '../../translations/TranslateText'; // Asegúrate de que el nombre coincida

const Usa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.foxnews.com/api/article-search?searchBy=categories&values=fox-news%2Fus&size=5&from=5');
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

        setData(translatedArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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






