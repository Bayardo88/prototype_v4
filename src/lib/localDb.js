// Local mock database used when Supabase is not configured (or when forced via env).

export const localDb = {
  firms: [
    { id: 'firm-apex-ventures', name: 'Apex Ventures', firm_value: 128_400_000, firm_value_delta: 0.032 },
    { id: 'firm-northbridge-capital', name: 'Northbridge Capital', firm_value: 92_750_000, firm_value_delta: -0.014 },
    { id: 'firm-redwood-partners', name: 'Redwood Partners', firm_value: 201_125_000, firm_value_delta: 0.018 },
    { id: 'firm-summit-equity', name: 'Summit Equity', firm_value: 76_300_000, firm_value_delta: 0.009 },
    { id: 'firm-horizon-holdings', name: 'Horizon Holdings', firm_value: 54_980_000, firm_value_delta: -0.006 },
  ],
  funds: [
    { id: 'fund-apex-i', name: 'Apex Fund I', firm_id: 'firm-apex-ventures' },
    { id: 'fund-apex-opportunities', name: 'Apex Opportunities', firm_id: 'firm-apex-ventures' },

    { id: 'fund-northbridge-growth', name: 'Northbridge Growth', firm_id: 'firm-northbridge-capital' },
    { id: 'fund-northbridge-select', name: 'Northbridge Select', firm_id: 'firm-northbridge-capital' },

    { id: 'fund-redwood-i', name: 'Redwood Fund I', firm_id: 'firm-redwood-partners' },
    { id: 'fund-redwood-digital', name: 'Redwood Digital', firm_id: 'firm-redwood-partners' },

    { id: 'fund-summit-core', name: 'Summit Core', firm_id: 'firm-summit-equity' },
    { id: 'fund-summit-alpha', name: 'Summit Alpha', firm_id: 'firm-summit-equity' },

    { id: 'fund-horizon-seed', name: 'Horizon Seed', firm_id: 'firm-horizon-holdings' },
    { id: 'fund-horizon-expansion', name: 'Horizon Expansion', firm_id: 'firm-horizon-holdings' },
  ],
  companies: [
    { id: 'co-aurora-payments', name: 'Aurora Payments', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-i' },
    { id: 'co-banyan-health', name: 'Banyan Health', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-i' },
    { id: 'co-cobalt-systems', name: 'Cobalt Systems', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-i' },
    { id: 'co-deltaforge', name: 'DeltaForge', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-opportunities' },
    { id: 'co-echowise', name: 'EchoWise', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-opportunities' },
    { id: 'co-fern-labs', name: 'Fern Labs', firm_id: 'firm-apex-ventures', fund_id: 'fund-apex-opportunities' },

    { id: 'co-galileo-analytics', name: 'Galileo Analytics', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-growth' },
    { id: 'co-harbor-ai', name: 'Harbor AI', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-growth' },
    { id: 'co-ivory-network', name: 'Ivory Network', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-growth' },
    { id: 'co-juniper-security', name: 'Juniper Security', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-select' },
    { id: 'co-kestrel-cloud', name: 'Kestrel Cloud', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-select' },
    { id: 'co-lumen-workspaces', name: 'Lumen Workspaces', firm_id: 'firm-northbridge-capital', fund_id: 'fund-northbridge-select' },

    { id: 'co-mosaic-commerce', name: 'Mosaic Commerce', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-i' },
    { id: 'co-nimbus-logistics', name: 'Nimbus Logistics', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-i' },
    { id: 'co-onyx-robotics', name: 'Onyx Robotics', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-i' },
    { id: 'co-prairie-devices', name: 'Prairie Devices', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-digital' },
    { id: 'co-quartz-crm', name: 'Quartz CRM', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-digital' },
    { id: 'co-riverstone-biotech', name: 'Riverstone Biotech', firm_id: 'firm-redwood-partners', fund_id: 'fund-redwood-digital' },

    { id: 'co-saffron-education', name: 'Saffron Education', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-core' },
    { id: 'co-titan-identity', name: 'Titan Identity', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-core' },
    { id: 'co-umbra-finance', name: 'Umbra Finance', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-core' },
    { id: 'co-verdant-energy', name: 'Verdant Energy', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-alpha' },
    { id: 'co-windmill-ops', name: 'Windmill Ops', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-alpha' },
    { id: 'co-xenon-mobility', name: 'Xenon Mobility', firm_id: 'firm-summit-equity', fund_id: 'fund-summit-alpha' },

    { id: 'co-yarrow-insights', name: 'Yarrow Insights', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-seed' },
    { id: 'co-zenith-aero', name: 'Zenith Aero', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-seed' },
    { id: 'co-arbor-supply', name: 'Arbor Supply', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-seed' },
    { id: 'co-boreal-studio', name: 'Boreal Studio', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-expansion' },
    { id: 'co-cascade-scheduling', name: 'Cascade Scheduling', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-expansion' },
    { id: 'co-drift-telemetry', name: 'Drift Telemetry', firm_id: 'firm-horizon-holdings', fund_id: 'fund-horizon-expansion' },
  ],
};

