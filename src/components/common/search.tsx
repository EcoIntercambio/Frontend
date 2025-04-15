import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SVGFilter, SVGSearch } from "../svg";

export function SearchInput() {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SVGSearch />
        <TextInput style={styles.searchInput} />
      </View>
      <View style={styles.searchFilter}>
        <View style={styles.searchFilterDivider}></View>
        <TouchableOpacity>
          <SVGFilter />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "transparent",
    marginLeft: 10,
  },
  searchFilter: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchFilterDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
});
