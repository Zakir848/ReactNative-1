import { Button, FlatList, Pressable, Text, View } from "react-native";
import { useState } from "react";
import Users from "./Users";

type Players = {
  User1: string;
  User2: string;
};

export default function Arena() {
  const [board, setBoard] = useState<(null | "X" | "O")[]>(Array(9).fill(null));

  const [turn, setTurn] = useState<"X" | "O">("X");

  const [winner, setWinner] = useState<"X" | "O" | null>(null);

  const [users, setUsers] = useState<Players>();

  const [isFinish, setIsFinish] = useState<boolean>(false);

  const checkGame = (cells: (null | "X" | "O")[]) => {
    const combiniton = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of combiniton) {
      if (cells[a] !== null && cells[a] === cells[b] && cells[b] === cells[c])
        return cells[a];
    }

    return null;
  };

  const handlePress = (index: number) => {
    if (!users || !users.User1.trim() || !users.User2.trim()) return;
    if (isFinish) return;

    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);

    const result = checkGame(newBoard);

    if (result !== null) {
      setWinner(result);
      setIsFinish(true);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setIsFinish(true);
      return;
    }

    setTurn(turn === "X" ? "O" : "X");
  };

  const refresh = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setIsFinish(false);
    setWinner(null);
  };

  return (
    <View>
      <Users setUsers={setUsers} />
      <View style={{ padding: 25 }}>
        {users && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Text>{users.User1} | X</Text>
            <Text>{users.User2} | O</Text>
          </View>
        )}

        <FlatList
          data={board}
          numColumns={3}
          extraData={turn}
          keyExtractor={(_, index) => index.toString()}
          style={{
            backgroundColor: "orange",
            marginTop: 20,
            borderColor: "blue",
            borderWidth: 2,
          }}
          renderItem={({ item, index }) => (
            <Pressable
              style={{
                borderColor: "blue",
                borderWidth: 2,
                aspectRatio: 1,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                return handlePress(index);
              }}
            >
              <Text style={{ fontSize: 40 }}>{item}</Text>
            </Pressable>
          )}
        />

        <View style={{ width: 150, marginTop: 5 }}>
          <Button title="Restart Game" onPress={refresh} />
        </View>
        {isFinish && (
          <Text>
            {winner
              ? `${winner === "X" ? users?.User1 : users?.User2} Qalib Geldi`
              : `Hec-Hece!`}
          </Text>
        )}
      </View>
    </View>
  );
}
