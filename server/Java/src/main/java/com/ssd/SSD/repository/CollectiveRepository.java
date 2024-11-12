package com.ssd.SSD.repository;

import com.ssd.SSD.models.Collective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectiveRepository extends JpaRepository<Collective, Long> {
}
