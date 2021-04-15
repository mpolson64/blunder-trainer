import { Button, Form, Input, Select } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { InaccuracyType, PuzzleInfo } from "../types/puzzle-types";
import { fetchGamesWithAnalysis } from "../util/lichess";
import { generatePuzzles } from "../util/puzzles";

interface Props {
  setPuzzles: Dispatch<SetStateAction<PuzzleInfo[]>>;
}

interface QueryBuilderFormValues {
  username: string;
  since: number;
}

const { Option } = Select;

const QueryBuilder = (props: Props) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const [form] = Form.useForm();

  const now = new Date();
  const yesterday = new Date().setDate(now.getDate() - 1);
  const lastWeek = new Date().setDate(now.getDate() - 7);
  const lastMonth = new Date().setMonth(now.getMonth() - 1);

  const onFinish = async (values: QueryBuilderFormValues) => {
    const games = await fetchGamesWithAnalysis(values.username, values.since);

    const puzzles = generatePuzzles(
      games,
      values.username,
      InaccuracyType.Inacuracy
    );
    props.setPuzzles(puzzles);
  };

  const onReset = () => {
    form.resetFields();

    props.setPuzzles([]);
  };
  return (
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
  );
};

export default QueryBuilder;
