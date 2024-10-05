use bevy_rapier3d::prelude::{CollisionGroups, Group};

pub fn group_flag_from_idx(link_idx: usize) -> Group {
    match link_idx {
        0 => Group::GROUP_1,
        1 => Group::GROUP_2,
        2 => Group::GROUP_3,
        3 => Group::GROUP_4,
        4 => Group::GROUP_5,
        5 => Group::GROUP_6,
        6 => Group::GROUP_7,
        7 => Group::GROUP_8,
        8 => Group::GROUP_9,
        9 => Group::GROUP_10,
        10 => Group::GROUP_11,
        11 => Group::GROUP_12,
        12 => Group::GROUP_13,
        13 => Group::GROUP_14,
        14 => Group::GROUP_15,
        15 => Group::GROUP_16,
        16 => Group::GROUP_17,
        17 => Group::GROUP_18,
        18 => Group::GROUP_19,
        19 => Group::GROUP_20,
        20 => Group::GROUP_21,
        21 => Group::GROUP_22,
        22 => Group::GROUP_23,
        23 => Group::GROUP_24,
        24 => Group::GROUP_25,
        25 => Group::GROUP_26,
        26 => Group::GROUP_27,
        27 => Group::GROUP_28,
        28 => Group::GROUP_29,
        29 => Group::GROUP_30,
        30 => Group::GROUP_31,
        31 => Group::GROUP_32,
        _ => panic!("Link index only supports up-to 32 links"),
    }
}

pub fn collision_group(link_idx: usize, exclude_group: Option<Group>) -> CollisionGroups {
    let mut group = CollisionGroups {
        memberships: Group::empty(),
        filters: Group::all(),
    };

    let link_group = group_flag_from_idx(link_idx);
    // set this to be the link's group
    group.memberships = link_group;
    // do not include this link's group in the filter
    group.filters &= !link_group;

    if let Some(exclude_group) = exclude_group {
        group.filters &= !exclude_group;
    }

    group
}