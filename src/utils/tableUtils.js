import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";

export const handleSearch = (selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
};

export const handleReset = (clearFilters, setSearchText, setSearchedColumn, confirm, dataIndex) => {
    clearFilters();
    confirm();
    setSearchText("");
    setSearchedColumn(dataIndex);
};

export const getColumnSearchProps = (
    dataIndex,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput
) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
                ref={searchInput}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
                style={{
                    marginBottom: 8,
                    display: "block",
                }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Search
                </Button>
                <Button
                    onClick={() =>
                        clearFilters && handleReset(clearFilters, setSearchText, setSearchedColumn, confirm, dataIndex)
                    }
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({
                            closeDropdown: false,
                        });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}
                >
                    Filter
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                >
                    close
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
            style={{
                color: filtered ? "#1890ff" : undefined,
            }}
        />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    },
    render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{
                    backgroundColor: "#ffc069",
                    padding: 0,
                }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
            />
        ) : (
            text
        ),
});
