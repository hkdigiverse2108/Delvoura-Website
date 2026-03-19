import { useState } from "react";
import { Button, Card, ConfigProvider, Flex, Input, Modal, Tag, Typography,} from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const popularSearches = [
  "Amber","Aquatic","Citrus","Floral","Fresh","Gourmand",
  "Musk","Oud","Powdery","Smoky","Spicy","Woody",
];

const genderTags = ["Women", "Men", "Unisex"];
const seasons = ["Summer", "Winter", "Monsoon", "All-Weather"];

const products = [
  { name: "Velvet Bloom", price: "From Rs. 299", tone: "rose" },
  { name: "Citrine Drift", price: "From Rs. 349", tone: "gold" },
  { name: "Noir Ember", price: "From Rs. 399", tone: "ink" },
];

const productTone: Record<string, string> = {
  rose: "linear-gradient(135deg,#3b0f1b,#6a2436,#b14c63)",
  gold: "linear-gradient(135deg,#3b2916,#6a4a23,#c99652)",
  ink: "linear-gradient(135deg,#0f111a,#1f2a3d,#384662)",
};

const SearchBarWithModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "var(--color-accent)", borderRadiusLG: 20,},}}>
        {/* BUTTON */}
      <Button onClick={() => setOpen(true)} icon={<SearchOutlined />} className="delvoura-search-btn delvoura-header-pill hidden items-center text-base md:inline-flex" style={{color: "var(--color-text-muted)",}}>
        Search perfumes...
      </Button>

      {/* MODAL */}
      <Modal open={open} onCancel={() => setOpen(false)} footer={null} closable={false} centered width="95vw" rootClassName="delvoura-header-theme delvoura-search-modal" style={{ maxWidth: 1400 }}
        styles={{ body: { padding: 0, height: "80vh", width: "100%", overflow: "auto", background: "transparent",},
          mask: { backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.45)",},
        }}
      >
        <div className="delvoura-modal-surface">
          <Flex align="center" gap={12}>
            <Input autoFocus size="large" placeholder="Search perfumes, notes..." prefix={ <SearchOutlined style={{ color: "var(--color-accent)" }} /> }
              style={{ borderRadius: 16, height: 54, background: "var(--color-bg)",}} className="delvoura-input" />
            <Button shape="circle" icon={<CloseOutlined />} onClick={() => setOpen(false)} className="delvoura-glow-pill" />
          </Flex>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          
          <div className="delvoura-modal-left space-y-6 rounded-3xl p-5">
            <div>
              <Title level={5}>Popular Searches</Title>
              <Flex wrap gap={10}>
                {popularSearches.map((item) => (
                  <Tag key={item} className="delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5" > {item}</Tag>
                ))}
              </Flex>
            </div>

            <div>
              <Title level={5}>Shop by Gender</Title>
              <Flex wrap gap={10}>
                {genderTags.map((item) => (
                  <Tag key={item} className="delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5"> {item} </Tag>
                ))}
              </Flex>
            </div>

            <div>
              <Title level={5}>Seasonal Picks</Title>
              <Flex wrap gap={10}>
                {seasons.map((item) => (
                  <Tag key={item} className="delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5">{item}</Tag>))}
              </Flex>
            </div>
          </div>

          {/* RIGHT */}
          <div className="delvoura-modal-right rounded-3xl p-6">
            <Title level={5} >Popular Products</Title>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <Card key={product.name} hoverable styles={{ body: { padding: 12 } }} className="delvoura-product-card" style={{ borderRadius: 20,}}>
                  <div style={{ height: 140, borderRadius: 14, background: productTone[product.tone],}}/>
                  <Title level={5} style={{ marginTop: 12 }}> {product.name} </Title>
                  <Text type="secondary">Eau De Parfum</Text>
                  <div style={{ marginTop: 6 }}><Text style={{ color: "var(--color-soft-accent)" }}> {product.price} </Text></div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default SearchBarWithModal;
