import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo.png";

import styles from "./styles";
import api from "../../services/api";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleNavigateDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    try {
      if (
        loading ||
        (totalIncidents > 0 && incidents.length === totalIncidents)
      ) {
        return;
      }
      setLoading(true);
      const response = await api.get("incident", {
        params: { page }
      });
      setIncidents([...incidents, ...response.data]);
      setTotalIncidents(response.headers["x-total-count"]);
      setPage(page + 1);
      setLoading(false);
    } catch (err) {
      alert("Erro.");
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalIncidents}</Text>{" "}
          casos
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um caso abaixo e salve o dia!
      </Text>
      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(i: any) => String(i.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.8}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleNavigateDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Detalhes</Text>
              <Feather name="arrow-right" size={16} color={"#e02041"}></Feather>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
