import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

type Player = {
  User1: string;
  User2: string;
};

type UserProps = {
  setUsers: (users: Player) => void;
};

export default function Users({ setUsers }: UserProps) {
  const [names, setName] = useState<Player>({
    User1: "",
    User2: "",
  });

  const onSubmit = () => {
    const User1 = names.User1.trim();
    const User2 = names.User2.trim();

    if (!User1 || !User2) return;

    setUsers({ User1, User2 });
  };

  const style = {
    width: "100%",
    borderColor: "#116edf",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
  };

  return (
    <View style={{ width: "80%", gap: 5, marginLeft: 5 }}>
      <View style={{ width: "50%", flexDirection: "row", gap: 5 }}>
        <TextInput
          style={style}
          placeholder="Enter Name User 1"
          value={names.User1}
          onChangeText={(text: string) =>
            setName((prev) => ({
              ...prev,
              User1: text,
            }))
          }
        />

        <TextInput
          style={style}
          placeholder="Enter Name User 2"
          value={names.User2}
          onChangeText={(text: string) =>
            setName((prev) => ({
              ...prev,
              User2: text,
            }))
          }
        />
      </View>

      <Button title="Start Game" onPress={() => onSubmit()} />
    </View>
  );
}
