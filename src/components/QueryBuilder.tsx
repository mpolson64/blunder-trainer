import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Input, Button, Select, Descriptions } from "antd";
import { fetchGamesWithAnalysis } from "../util/lichess";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";
import { generatePuzzles } from "../util/puzzles";

const { Option } = Select;

interface Props {
  puzzle: PuzzleInfo;
  setPuzzle: Dispatch<SetStateAction<PuzzleInfo>>;
}

interface QueryBuilderFormValues {
  username: string;
  since: number;
}

const QueryBuilder = (props: Props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();
  const [numGamesLoaded, setNumGamesLoaded] = useState(0);
  const [puzzles, setPuzzles] = useState<PuzzleInfo[]>([]);

  const now = new Date();
  const yesterday = new Date().setDate(now.getDate() - 1);
  const lastWeek = new Date().setDate(now.getDate() - 7);
  const lastMonth = new Date().setMonth(now.getMonth() - 1);

  const onFinish = async (values: QueryBuilderFormValues) => {
    const games = await fetchGamesWithAnalysis(values.username, values.since);
    setNumGamesLoaded(games.length);

    const puzzles = generatePuzzles(
      games,
      values.username,
      InaccuracyType.Inacuracy
    );
    setPuzzles(puzzles);
  };

  const onReset = () => {
    form.resetFields();

    setNumGamesLoaded(0);
    setPuzzles([]);
  };

  const onPlayRandomPuzzle = () => {
    if (puzzles.length > 0) {
      props.setPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)]);
      console.log(props.puzzle);
    } else {
      alert("No puzzles loaded!");
    }
  };

  return (
    <>
      <Form {...layout} form={form} name="query-builder" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Lichess Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="since" label="Games from" rules={[{ required: true }]}>
          <Select
            placeholder="Load games from past day, week, month..."
            allowClear
          >
            <Option value={yesterday}>Day</Option>
            <Option value={lastWeek}>Week</Option>
            <Option value={lastMonth}>Month</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Load Games
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Descriptions title="Status" column={1} bordered>
        <Descriptions.Item label="Games Loaded">
          {numGamesLoaded}
        </Descriptions.Item>
        <Descriptions.Item label="Puzzles Generated">
          {puzzles.length}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" onClick={onPlayRandomPuzzle}>
        Play Random Puzzle
      </Button>
    </>
  );
};

export default QueryBuilder;
