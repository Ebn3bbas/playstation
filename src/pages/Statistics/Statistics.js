import React from 'react';
import styles from './Statistics.module.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Cell,
    Pie,
} from 'recharts';
import Table from '../../components/Table/Table';
import EditButton from '../../components/Buttons/EditButton/EditButton';
import DeleteButton from '../../components/Buttons/DeleteButton/DeleteButton';
import { useNavigate } from 'react-router';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data02 = [
    { name: 'Group A', value: 300 },
    { name: 'Group B', value: 400 },
];

const COLORS = ['#0088FE', '#000'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log(percent);
    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Statistics = () => {
    const navigate = useNavigate();
    const updateHandler = () => {
        navigate('/settings-update-form');
    };
    const deleteHandler = () => {
        console.log('data deleted');
    };
    const columns = ['Username', 'Phone', 'Role', 'edit', 'delete'];
    const tableData = [
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
        {
            s: 'sdf',
            a: 'sdf',
            ad: 'sdsa',
            edit: <EditButton updateHandler={updateHandler} />,
            delete: <DeleteButton deleteHandler={deleteHandler} />,
        },
    ];

    return (
        <>
            <div className={styles.statisticsContainer}>
                <div className={styles.lineChart}>
                    <h4>Name</h4>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 40,
                            }}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type='monotone'
                                dataKey='pv'
                                stroke='#8884d8'
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type='monotone'
                                dataKey='uv'
                                stroke='#82ca9d'
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.lineChart02}>
                    <h4>Name</h4>
                    <ResponsiveContainer width='100%' height='74%'>
                        <PieChart
                            width={300}
                            height={300}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 40,
                            }}
                        >
                            <Pie
                                data={data02}
                                cx='50%'
                                cy='50%'
                                labelLine={false}
                                // label={renderCustomizedLabel}
                                outerRadius={80}
                                innerRadius={60}
                                paddingAngle={5}
                                fill='#8884d8'
                                dataKey='value'
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className={styles.lineChart02Desc}>
                        <div className={styles.lineChart02Avalible}>
                            <div
                                className={styles.lineChart02AvalibleColor}
                            ></div>
                            <h4>
                                {`${(
                                    (data02[0].value / data02[1].value) *
                                    100
                                ).toFixed(0)}%`}{' '}
                                Avalible
                            </h4>
                        </div>
                        <div className={styles.lineChart02Unavalible}>
                            <div
                                className={styles.lineChart02UnavalibleColor}
                            ></div>
                            <h4>
                                {`${
                                    100 -
                                    (
                                        (data02[0].value / data02[1].value) *
                                        100
                                    ).toFixed(0)
                                }%`}{' '}
                                unAvalible
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <Table
                    addNewButton={false}
                    data={tableData}
                    columns={columns}
                    tableName='Settings'
                />
            </div>
        </>
    );
};

export default Statistics;
