import { useState } from "react";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useJobs,
  useCreateJob,
  useDeleteJob,
  useUpdateJob,
  useUpdateJobStatus,
  Job,
} from "../../api/jobs";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  Modal,
  ModalBody,
  ModalFooter,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  ActionButton,
  DataCard,
  DataCardTitle,
  DataCardDescription,
  DataCardTags,
  LoadingScreen,
} from "../../components/admin/ui";

interface JobFormData {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  category: string;
  location: string;
  contractType: string;
  remoteType: string;
  salary: string;
  requirements: string;
  benefits: string;
  status: "published" | "draft";
}

const getInitialFormData = (job?: Job | null): JobFormData => ({
  titleFr: job?.title?.fr || "",
  titleEn: job?.title?.en || "",
  descriptionFr: job?.description?.fr || "",
  descriptionEn: job?.description?.en || "",
  category: job?.category || "development",
  location: job?.location || "Remote",
  contractType: job?.contractType || "fulltime",
  remoteType: job?.remoteType || "remote",
  salary: job?.salary || "",
  requirements: job?.requirements?.join("\n") || "",
  benefits: job?.benefits?.join("\n") || "",
  status: job?.status || "draft",
});

export default function JobsManagement() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [formData, setFormData] = useState<JobFormData>(getInitialFormData());

  const { data: jobsData, isLoading } = useJobs({
    status: filterStatus || undefined,
    category: filterCategory || undefined,
  });
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const updateJobStatus = useUpdateJobStatus();

  const jobs = (jobsData?.data || []) as Job[];
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingJob(null);
    setFormData(getInitialFormData());
    setIsModalOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setFormData(getInitialFormData(job));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { fr: formData.titleFr, en: formData.titleEn },
      description: { fr: formData.descriptionFr, en: formData.descriptionEn },
      category: formData.category,
      location: formData.location,
      contractType: formData.contractType,
      remoteType: formData.remoteType,
      salary: formData.salary,
      requirements: formData.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      benefits: formData.benefits
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      status: formData.status,
    };

    if (editingJob) {
      await updateJob.mutateAsync({ id: editingJob.id, ...payload });
    } else {
      await createJob.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t("admin.jobs.confirmDelete"))) {
      await deleteJob.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === "published" ? "draft" : "published";
    await updateJobStatus.mutateAsync({ id: job.id, status: newStatus });
  };

  const updateField = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const categories = ["development", "design", "marketing", "management", "other"];
  const contractTypes = ["fulltime", "parttime", "contract", "freelance", "internship"];
  const remoteTypes = ["remote", "hybrid", "onsite"];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={t("admin.jobs.title")}
        description={t("admin.jobs.subtitle")}
        count={jobs.length}
        icon={Briefcase}
        actionLabel={t("admin.jobs.createJob")}
        onAction={openCreate}
      />

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher une offre..."
          />
        </div>
        <FormSelect
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">{t("careers.filters.all")}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t(`careers.categories.${cat}`)}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">{t("careers.filters.all")}</option>
          <option value="published">{t("admin.jobs.published")}</option>
          <option value="draft">{t("admin.jobs.draft")}</option>
        </FormSelect>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={Briefcase}
            title={t("admin.jobs.noJobs")}
            description={
              searchTerm
                ? "Aucune offre ne correspond à votre recherche"
                : t("admin.jobs.createFirst")
            }
            actionLabel={t("admin.jobs.createJob")}
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job, index) => (
            <DataCard
              key={job.id}
              index={index}
              onEdit={() => openEdit(job)}
              onDelete={() => handleDelete(job.id)}
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStatus(job);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    job.status === "published"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {job.status === "published"
                    ? t("admin.jobs.published")
                    : t("admin.jobs.draft")}
                </button>
              </div>

              <DataCardTitle>
                {job.title.fr} / {job.title.en}
              </DataCardTitle>

              <DataCardDescription>
                {job.description.fr.substring(0, 100)}
                {job.description.fr.length > 100 ? "..." : ""}
              </DataCardDescription>

              {/* Job Meta */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {t(`careers.contractTypes.${job.contractType}`)}
                </div>
                {job.salary && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                )}
              </div>

              <DataCardTags
                tags={[
                  t(`careers.categories.${job.category}`),
                  t(`careers.remoteTypes.${job.remoteType}`),
                ]}
              />

              {job.applicationsCount !== undefined && job.applicationsCount > 0 && (
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {t("admin.jobs.applicationsCount", { count: job.applicationsCount })}
                </div>
              )}
            </DataCard>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingJob ? t("admin.jobs.editJob") : t("admin.jobs.createJob")
        }
      >
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {/* Titles */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t("admin.jobs.jobTitleFr")} required>
                <FormInput
                  value={formData.titleFr}
                  onChange={(e) => updateField("titleFr", e.target.value)}
                  required
                />
              </FormField>
              <FormField label={t("admin.jobs.jobTitleEn")} required>
                <FormInput
                  value={formData.titleEn}
                  onChange={(e) => updateField("titleEn", e.target.value)}
                  required
                />
              </FormField>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t("admin.jobs.descriptionFr")} required>
                <FormTextarea
                  value={formData.descriptionFr}
                  onChange={(e) => updateField("descriptionFr", e.target.value)}
                  required
                  rows={4}
                />
              </FormField>
              <FormField label={t("admin.jobs.descriptionEn")} required>
                <FormTextarea
                  value={formData.descriptionEn}
                  onChange={(e) => updateField("descriptionEn", e.target.value)}
                  required
                  rows={4}
                />
              </FormField>
            </div>

            {/* Category, Location, Contract Type */}
            <div className="grid grid-cols-3 gap-4">
              <FormField label={t("admin.jobs.category")} required>
                <FormSelect
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {t(`careers.categories.${cat}`)}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField label={t("admin.jobs.location")} required>
                <FormInput
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  required
                  placeholder="Paris, Remote, etc."
                />
              </FormField>

              <FormField label={t("admin.jobs.contractType")} required>
                <FormSelect
                  value={formData.contractType}
                  onChange={(e) => updateField("contractType", e.target.value)}
                  required
                >
                  {contractTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`careers.contractTypes.${type}`)}
                    </option>
                  ))}
                </FormSelect>
              </FormField>
            </div>

            {/* Remote Type & Salary */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t("admin.jobs.remoteType")} required>
                <FormSelect
                  value={formData.remoteType}
                  onChange={(e) => updateField("remoteType", e.target.value)}
                  required
                >
                  {remoteTypes.map((type) => (
                    <option key={type} value={type}>
                      {t(`careers.remoteTypes.${type}`)}
                    </option>
                  ))}
                </FormSelect>
              </FormField>

              <FormField label={t("admin.jobs.salary")}>
                <FormInput
                  value={formData.salary}
                  onChange={(e) => updateField("salary", e.target.value)}
                  placeholder={t("admin.jobs.salaryPlaceholder")}
                />
              </FormField>
            </div>

            {/* Requirements */}
            <FormField label={t("admin.jobs.requirements")}>
              <FormTextarea
                value={formData.requirements}
                onChange={(e) => updateField("requirements", e.target.value)}
                rows={5}
                placeholder={t("admin.jobs.requirementsPlaceholder")}
              />
            </FormField>

            {/* Benefits */}
            <FormField label={t("admin.jobs.benefits")}>
              <FormTextarea
                value={formData.benefits}
                onChange={(e) => updateField("benefits", e.target.value)}
                rows={5}
                placeholder={t("admin.jobs.benefitsPlaceholder")}
              />
            </FormField>

            {/* Status */}
            <FormField label={t("admin.jobs.status")} required>
              <FormSelect
                value={formData.status}
                onChange={(e) =>
                  updateField("status", e.target.value as "published" | "draft")
                }
                required
              >
                <option value="draft">{t("admin.jobs.draft")}</option>
                <option value="published">{t("admin.jobs.published")}</option>
              </FormSelect>
            </FormField>
          </ModalBody>

          <ModalFooter>
            <ActionButton
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              isLoading={createJob.isPending || updateJob.isPending}
            >
              {editingJob ? "Mettre à jour" : "Créer"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
